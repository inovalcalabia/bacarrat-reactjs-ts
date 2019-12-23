import React from "react";
import { connect } from "react-redux";
import { number } from "prop-types";
import ActionTypes from "./../store/action";

interface IGameLogicProps {
  dispatch: any;
  tieChips: Array<string>;
  bankerChips: Array<string>;
  playerChips: Array<string>;
  playerBetAmount: number;
  bankerBetAmount: number;
  tieBetAmount: number;
  winAmount: number;
  lock: boolean;
}

const LOCK_GAME_TIME: number = 6;
const CHECK_ADD_CARD_TIME: number = 5;
const END_GAME_TIME: number = 0;
const MAX_TIME = 20;
export class GameLogic extends React.Component<IGameLogicProps, any> {
  currentTime: number;
  maxTime: number;
  cardList: Array<number>;
  openCardList: Array<number>;
  closeCardList: Array<number>;
  playerCardList: Array<number>;
  bankerCardList: Array<number>;
  playerTotalValue: number;
  bankerTotalValue: number;
  constructor(props: any) {
    super(props);
    this.currentTime = 20;
    
    this.cardList = [];
    this.closeCardList = [];
    this.playerCardList = [];
    this.bankerCardList = [];
    this.playerTotalValue = 0;
    this.bankerTotalValue = 0;
    this.setCardList();
    this.props.dispatch({ type: "CLEAR_GAME" });
    setInterval(this.timerHandler.bind(this), 1000);
    this.shuffleDeck();
    this.giveCard();
  }
  setCardList() {
    // spade heart diamond club
    for (let i: number = 1; i <= 52; i += 1) {
      this.cardList.push(i);
    }
  }
  timerHandler() {
    this.props.dispatch({
      type: ActionTypes.UPDATE_TIME,
      payload: { time: this.currentTime }
    });
    this.currentTime -= 1;
    if (this.currentTime === LOCK_GAME_TIME) {
      this.lockGame();
    }
    if (this.currentTime === CHECK_ADD_CARD_TIME) {
      this.checkAddCard();
    }
    if (this.currentTime < END_GAME_TIME) {
      this.gameReset();
    }
  }
  lockGame() {
    this.updateTotalValue();
    this.props.dispatch({
      type: ActionTypes.SET_LOCK,
      payload: { lock: true }
    });
  }
  gameReset() {
    this.currentTime = MAX_TIME;
    this.clearGame();
    if (this.openCardList.length < 10) {
      // shuffle if no more cards on deck
      this.shuffleDeck();
    }
    this.giveCard();
  }
  checkAddCard() {
    if (this.checkPlayerAddCard(this.playerTotalValue)) {
      this.addCard(this.playerCardList);
      this.props.dispatch({
        type: ActionTypes.ADD_PLAYER_CARD,
        payload: {
          playerCard: this.playerCardList[
            this.playerCardList.length - 1
          ].toString()
        }
      });
    }
    if (this.checkBankerAddCard(this.bankerTotalValue, this.playerCardList)) {
      this.addCard(this.bankerCardList);
      this.props.dispatch({
        type: ActionTypes.ADD_BANKER_CARD,
        payload: {
          bankerCard: this.bankerCardList[
            this.bankerCardList.length - 1
          ].toString()
        }
      });
    }
    this.updateTotalValue();
    this.getResult(this.playerTotalValue, this.bankerTotalValue);
  }

  clearGame() {
    this.closeCardList = [];
    this.playerCardList = [];
    this.bankerCardList = [];
    this.playerTotalValue = 0;
    this.bankerTotalValue = 0;
    this.props.dispatch({ type: ActionTypes.CLEAR_GAME });
    this.props.dispatch({
      type: ActionTypes.SET_LOCK,
      payload: { lock: false }
    });
    this.updateTotalValue();
  }
  shuffleDeck() {
    this.openCardList = Object.assign(
      [],
      this.cardList.sort(() => Math.random() - 0.5)
    );
  }
  updateTotalValue() {
    this.playerTotalValue = this.getTotal(this.playerCardList);
    this.bankerTotalValue = this.getTotal(this.bankerCardList);
    this.props.dispatch({
      type: ActionTypes.UPDATE_TOTAL_VALUE,
      payload: {
        playerTotalValue: this.playerTotalValue,
        bankerTotalValue: this.bankerTotalValue
      }
    });
  }
  giveCard() {
    // first draw
    for (let i = 0; i < 4; i += 1) {
      if (i % 2 === 0) {
        this.addCard(this.playerCardList);
      } else {
        this.addCard(this.bankerCardList);
      }
    }

    this.playerTotalValue = this.getTotal(this.playerCardList);
    this.bankerTotalValue = this.getTotal(this.bankerCardList);

    for (let i = 0; i < this.bankerCardList.length; i += 1) {
      this.props.dispatch({
        type: ActionTypes.ADD_BANKER_CARD,
        payload: { bankerCard: this.bankerCardList[i].toString() }
      });
    }
    for (let i = 0; i < this.playerCardList.length; i += 1) {
      this.props.dispatch({
        type: ActionTypes.ADD_PLAYER_CARD,
        payload: { playerCard: this.playerCardList[i].toString() }
      });
    }
  }

  getResult(_playerTotalValue: number, _bankerTotalValue: number) {
    let winner = "tie";
    let multiplier = 9;
    let betAmt = this.props.tieBetAmount;
    let winnerType = 0;
    if (_playerTotalValue > _bankerTotalValue) {
      betAmt = this.props.playerBetAmount;
      multiplier = 2;
      winner = "player";
      winnerType = 1; // player
    } else if (_bankerTotalValue > _playerTotalValue) {
      betAmt = this.props.bankerBetAmount;
      multiplier = 2;
      winner = "banker";
      winnerType = 2; // banker 
    }
    this.props.dispatch({
      type: ActionTypes.SET_WINNER,
      payload: { winner, winAmount: betAmt * multiplier }
    });
  }
  addCard(arr: Array<number>) {
    arr.push(this.openCardList.splice(0, 1)[0]);
  }
  checkPlayerAddCard(_playerTotalValue: number) {
    if (_playerTotalValue <= 5) {
      return true;
    }
    return false;
  }
  checkBankerAddCard(
    _bankerTotalValue: number,
    _playerCardList: Array<number>
  ) {
    if (_bankerTotalValue <= 2) {
      return true;
    }
    if (_playerCardList.length === 3) {
      let playerLastCardValue: number = this.getCardValue(_playerCardList[2])
        .value;
      if (
        _bankerTotalValue === 3 &&
        ((playerLastCardValue >= 0 && playerLastCardValue <= 7) ||
          playerLastCardValue === 9)
      ) {
        return true;
      } else if (
        _bankerTotalValue === 4 &&
        playerLastCardValue >= 2 &&
        playerLastCardValue <= 7
      ) {
        return true;
      } else if (
        _bankerTotalValue === 5 &&
        playerLastCardValue >= 4 &&
        playerLastCardValue <= 7
      ) {
        return true;
      } else if (
        _bankerTotalValue === 6 &&
        playerLastCardValue >= 6 &&
        playerLastCardValue <= 7
      ) {
        return true;
      }
    }
    return false;
  }
  getTotal(arr: Array<number>) {
    let total: number = 0;
    for (let i = 0; i < arr.length; i += 1) {
      let val = this.getCardValue(arr[i]).value;
      if (val < 10) {
        total += val;
      }
    }
    return total % 10;
  }
  getCardValue(_value: number) {
    let suit: string;
    let cardValue = 1;
    if (_value >= 1 && _value <= 13) {
      suit = "spade";
      cardValue = _value;
    } else if (_value >= 14 && _value <= 26) {
      suit = "heart";
      cardValue = Math.abs(_value - 13);
    } else if (_value >= 27 && _value <= 39) {
      suit = "diamond";
      cardValue = Math.abs(_value - 26);
    } else {
      suit = "club";
      cardValue = Math.abs(_value - 39);
    }
    return { suit: suit, value: cardValue };
  }
  // 1. get 2 set of cards for player and banker
  // 2. add the value of the 2 cards {0 is the lowest, 9 is the highest}
  // 3. third card rule
  // player
  // 0 - 5 must draw
  // 6 or 7 must stand
  // 8 or 9 natural, must stand
  // banker
  // 0 - 2 must draw
  // 3 - draw card if player have (1, 2, 3 ,4 ,5 ,6, 7, 9, 0) not 8
  // 4 - draw card if player have (2, 3, 4, 5, 6, 7)
  // 5 - draw card if player have (4, 5, 6, 7)
  // 6 - draw card if player have (6, 7)
  // 7 - must stand
  // 8 - 9 - natural, must stand
  render() {
    return <div> </div>;
  }
}

const mapStateToProps = (state: any) => ({
  bankerChips: state.bankerChips,
  playerChips: state.playerChips,
  tieChips: state.tieChips,
  playerBetAmount: state.playerBetAmount,
  bankerBetAmount: state.bankerBetAmount,
  tieBetAmount: state.tieBetAmount,
  winAmount: state.winAmount,
  lock: state.lock
});
export default connect(mapStateToProps)(GameLogic);
