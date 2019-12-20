import React from "react";
import "./../styles/styles.css";
import { connect } from "react-redux";

interface IChipProps {
  dispatch: any;
  winAmount: number;
  walletAmount: number;
  playerBetAmount: number,
  bankerBetAmount: number
  tieBetAmount: number,
}

export class Controls extends React.Component<IChipProps, any> {
  constructor(props: any) {
    super(props);
  }
  selectChipHandler(_chipType: string) {
    console.log("chip type", this.props);
    //this.props.dispatch({type: "ADD_PLAYER_CARD", payload: {playerCard: "2"}});
    this.props.dispatch({
      type: "CHANGE_CHIP",
      payload: { chipType: _chipType }
    });
  }
  clearBet() {
    this.props.dispatch({
        type: "UPDATE_WALLET",
        payload: { walletAmount: (this.props.playerBetAmount + this.props.bankerBetAmount + this.props.tieBetAmount)}
      });
    this.props.dispatch({type: "CLEAR_BET"});
  }
  render() {
    return (
      <div className="controls">
        <div className="chips">
          <div
            className="chip-btn-1"
            onClick={this.selectChipHandler.bind(this, "1")}
          >
            <span>1</span>
          </div>
          <div
            className="chip-btn-25"
            onClick={this.selectChipHandler.bind(this, "25")}
          >
            <span>25</span>
          </div>
          <div
            className="chip-btn-50"
            onClick={this.selectChipHandler.bind(this, "50")}
          >
            <span>50</span>
          </div>
          <div
            className="chip-btn-100"
            onClick={this.selectChipHandler.bind(this, "100")}
          >
            <span>100</span>
          </div>
        </div>
        <div className="wallet">
          <span>balance: </span>
          <span>${this.props.walletAmount}</span>
        </div>
        <div className="bet-amount">
          <span>win amount: </span>
          <span>${this.props.winAmount}</span>
        </div>
        <button className="clear-btn" onClick={this.clearBet.bind(this)}>Clear</button>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  winAmount: state.winAmount,
  walletAmount: state.walletAmount,
  playerBetAmount: state.playerBetAmount,
  bankerBetAmount: state.bankerBetAmount,
  tieBetAmount: state.tieBetAmount
});
export default connect(mapStateToProps)(Controls);
