import React from "react";
import { connect } from "react-redux";
import { number } from "prop-types";
import ActionTypes from "./../store/action";
import { getCardValue, initCardList, checkBankerAddCard, checkPlayerAddCard, getTotal} from './../utils/Utils';
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
const MAX_TIME: number = 20;
const NORMAL_MULTIPLIER: number = 2;
const TIE_MULTIPLIER: number = 2;
const TIE: number = 0;
const PLAYER: number = 1;
const BANKER: number = 2;
const TIME_SPEED = 1000;
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
    this.currentTime = MAX_TIME;
    this.cardList = [];
    this.closeCardList = [];
    this.playerCardList = [];
    this.bankerCardList = [];
    this.playerTotalValue = 0;
    this.bankerTotalValue = 0;
    this.cardList = initCardList();
    this.props.dispatch({ type: ActionTypes.CLEAR_GAME });
    setInterval(this.timerHandler.bind(this), TIME_SPEED);
    this.shuffleDeck();
    this.giveCard();
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
    if (checkPlayerAddCard(this.playerTotalValue)) {
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
    if (checkBankerAddCard(this.bankerTotalValue, this.playerCardList)) {
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
    this.playerTotalValue = getTotal(this.playerCardList);
    this.bankerTotalValue = getTotal(this.bankerCardList);
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

    this.playerTotalValue = getTotal(this.playerCardList);
    this.bankerTotalValue = getTotal(this.bankerCardList);

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
    let multiplier = TIE_MULTIPLIER;
    let betAmt = this.props.tieBetAmount;
    let winnerType = TIE;
    if (_playerTotalValue > _bankerTotalValue) {
      betAmt = this.props.playerBetAmount;
      multiplier = NORMAL_MULTIPLIER;
      winner = "player";
      winnerType = PLAYER; // player
    } else if (_bankerTotalValue > _playerTotalValue) {
      betAmt = this.props.bankerBetAmount;
      multiplier = NORMAL_MULTIPLIER;
      winner = "banker";
      winnerType = BANKER; // banker 
    }
    this.props.dispatch({
      type: ActionTypes.SET_WINNER,
      payload: { winner, winAmount: betAmt * multiplier }
    });
  }
  addCard(arr: Array<number>) {
    arr.push(this.openCardList.splice(0, 1)[0]);
  }
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
