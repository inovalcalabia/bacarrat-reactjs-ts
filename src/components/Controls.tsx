import "./../styles/styles.css";
import React from "react";
import { connect } from "react-redux";

interface IChipProps {
  dispatch: any;
  winAmount: number;
  walletAmount: number;
  playerBetAmount: number,
  bankerBetAmount: number
  tieBetAmount: number,
  chipType: string;
}

export class Controls extends React.Component<IChipProps, any> {
  constructor(props: any) {
    super(props);
  }
  selectChipHandler(_chipType: string) {
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
            style={{transform: (this.props.chipType === "1") ? 'scale(1.2)' :'scale(1)'}}
          >
            <span>1</span>
          </div>
          <div
            className="chip-btn-25"
            onClick={this.selectChipHandler.bind(this, "25")}
            style={{transform: (this.props.chipType === "25") ? 'scale(1.2)' :'scale(1)'}}
          >
            <span>25</span>
          </div>
          <div
            className="chip-btn-50"
            onClick={this.selectChipHandler.bind(this, "50")}
            style={{transform: (this.props.chipType === "50") ? 'scale(1.2)' :'scale(1)'}}
          >
            <span>50</span>
          </div>
          <div
            className="chip-btn-100"
            onClick={this.selectChipHandler.bind(this, "100")}
            style={{transform: (this.props.chipType === "100") ? 'scale(1.2)' :'scale(1)'}}
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
// transform: scale(1.2);
const mapStateToProps = (state: any) => ({
  winAmount: state.winAmount,
  walletAmount: state.walletAmount,
  playerBetAmount: state.playerBetAmount,
  bankerBetAmount: state.bankerBetAmount,
  tieBetAmount: state.tieBetAmount,
  chipType: state.chipType
});
export default connect(mapStateToProps)(Controls);
