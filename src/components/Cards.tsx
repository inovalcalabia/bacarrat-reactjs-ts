import React from "react";
import "./../styles/styles.css";
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
  renderPlayerPoker() {
    var cards = [];

    if (this.props.playerCards) {
      var cardList = this.props.playerCards.split(",");
      for (var i = 1; i < cardList.length; i += 1) {
        cards.push(
          <div
            key={i + "pp"}
            className="player-poker"
            style={{
              backgroundPositionX: -getPoker(cardList[i]).frame.x,
              backgroundPositionY: -getPoker(cardList[i]).frame.y,
              left: -92 + i * 25 + "px"
            }}
          ></div>
        );
        cards.push(
          <div
            key={i + "ppb"}
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
  renderBankerPoker() {
    var cards = [];
    if (this.props.bankerCards) {
      var cardList = this.props.bankerCards.split(",");
      for (var i = 1; i < cardList.length; i += 1) {
        cards.push(
          <div
            key={i + "bp"}
            className="player-poker"
            style={{
              backgroundPositionX: -getPoker(cardList[i]).frame.x,
              backgroundPositionY: -getPoker(cardList[i]).frame.y,
              left: -92 + i * 25 + "px"
            }}
          ></div>
        );
        cards.push(
          <div
            key={i + "bpb"}
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
          {this.renderPlayerPoker()}
        </div>
        <div className="banker-cards">
          <div className="name">BANKER  {this.props.bankerTotalValue}</div>
          {this.renderBankerPoker()}
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
