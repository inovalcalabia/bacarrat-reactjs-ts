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
export class Cards extends React.Component<ICardProps, any> {
  constructor(props: any) {
    super(props);
  }
  renderPoker(_className: string, _cards: string) {
    let cards = [];
    if (_cards) {
      let cardList = _cards.split(",");
      for (let i = 1; i < cardList.length; i += 1) {
        cards.push(
          <div
            key={i + Math.random() * 20 + _className}
            className={_className}
            style={{
              backgroundPositionX: -getPoker(cardList[i]).frame.x,
              backgroundPositionY: -getPoker(cardList[i]).frame.y,
              left: -92 + i * 25 + "px"
            }}
          ></div>
        );
        cards.push(
          <div
            key={i + Math.random() * 20 + _className}
            className="back-card-poker"
            style={{
              left: -92 + i * 25 + "px",
              display: this.props.time <= 7 ? "none" : "block"
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
        <div className="player-cards">
          <div className="name">PLAYER {this.props.playerTotalValue}</div>
          {this.renderPoker("player-poker", this.props.playerCards)}
        </div>
        <div className="banker-cards">
          <div className="name">BANKER  {this.props.bankerTotalValue}</div>
          {this.renderPoker("banker-poker", this.props.bankerCards)}
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
