import React from "react";
import { getPoker } from "./../utils/Utils";
import { connect } from "react-redux";

interface ICardProps {
  playerCards: string;
  bankerCards: string;
  time: number;
  bankerTotalValue: number;
  playerTotalValue: number;
}
const LOCK_GAME_TIME: number = 6;
export class Cards extends React.Component<ICardProps, any> {
  constructor(props: any) {
    super(props);
  }
  renderPoker(_cards: string) {
    let cards = [];
    if (_cards) {
      let cardList = _cards.split(",");
      for (let i = 1; i < cardList.length; i += 1) {
        cards.push(
          <div
            key={i + Math.random() * 20 + "poker"}
            className="poker"
            style={{
              backgroundPositionX: -getPoker(cardList[i]).frame.x,
              backgroundPositionY: -getPoker(cardList[i]).frame.y,
              left: -92 + i * 25 + "px"
            }}
          ></div>
        );
        cards.push(
          <div
            key={i + Math.random() * 20 + "poker"}
            className="back-card-poker"
            style={{
              left: -92 + i * 25 + "px",
              display: this.props.time <= LOCK_GAME_TIME ? "none" : "block"
            }}
          ></div>
        );
      }
      return cards;
    }
  }
  render() {
    return (
      <div className="card-layer">
        <div className="cards player-border">
          <div className="name">PLAYER {this.props.playerTotalValue}</div>
          {this.renderPoker(this.props.playerCards)}
        </div>
        <div className="cards banker-border">
          <div className="name">BANKER  {this.props.bankerTotalValue}</div>
          {this.renderPoker(this.props.bankerCards)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  playerCards: state.playerCards,
  bankerCards: state.bankerCards,
  time: state.time,
  playerTotalValue: state.playerTotalValue,
  bankerTotalValue: state.bankerTotalValue,
});
export default connect(mapStateToProps)(Cards);
