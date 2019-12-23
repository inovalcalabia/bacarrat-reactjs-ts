import React from "react";
import { connect } from "react-redux";
import ActionTypes from "./../store/action";

interface ICardProps {
  dispatch: any;
  winAmount: number;
  walletAmount: number;
  playerBetAmount: number;
  bankerBetAmount: number;
  tieBetAmount: number;
  chipType: string;
}

export class Controls extends React.Component<ICardProps, any> {
  constructor(props: any) {
    super(props);
  }
  selectChipHandler(_chipType: string) {
    //this.props.dispatch({type: "ADD_PLAYER_CARD", payload: {playerCard: "2"}});
    this.props.dispatch({
      type: ActionTypes.CHANGE_CHIP,
      payload: { chipType: _chipType }
    });
  }
  clearBet() {
    this.props.dispatch({
      type: ActionTypes.UPDATE_WALLET,
      payload: {
        walletAmount:
          this.props.playerBetAmount +
          this.props.bankerBetAmount +
          this.props.tieBetAmount
      }
    });
    this.props.dispatch({ type: "CLEAR_BET" });
  }
  renderChips() {
    let chips: Array<string> = ["1", "25", "50", "100"];
    let chipSet = [];

    for (let i: number = 0; i < chips.length; i += 1) {
      chipSet.push(
        <div
          className={"chip-btn chip-url-" + chips[i]}
          onClick={this.selectChipHandler.bind(this, chips[i])}
          style={{
            transform:
              this.props.chipType === chips[i] ? "scale(1.2)" : "scale(1)"
          }}
        >
          <span>{chips[i]}</span>
        </div>
      );
    }
    return chipSet;
  }
  render() {
    return (
      <div className="controls">
        <div className="chips">{this.renderChips()}</div>
        <div className="wallet">
          <span>balance: </span>
          <span>${this.props.walletAmount}</span>
        </div>
        <div className="bet-amount">
          <span>win amount: </span>
          <span>${this.props.winAmount}</span>
        </div>
        <button className="clear-btn" onClick={this.clearBet.bind(this)}>
          Clear
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  winAmount: state.winAmount,
  walletAmount: state.walletAmount,
  playerBetAmount: state.playerBetAmount,
  bankerBetAmount: state.bankerBetAmount,
  tieBetAmount: state.tieBetAmount,
  chipType: state.chipType
});
export default connect(mapStateToProps)(Controls);
