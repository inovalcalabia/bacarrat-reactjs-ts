interface IBettingProps {
  chipType: string;
  tieChips: Array<string>;
  bankerChips: Array<string>;
  playerChips: Array<string>;
  winner: string;
  playerBetAmount: number;
  bankerBetAmount: number;
  tieBetAmount: number;
  walletAmount: number;
  dispatch: any;
}

interface IState {
  tieBetCount?: number;
  bankerBetCount?: number;
  playerBetCount?: number;
}

import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";
import ActionTypes from "./../store/action";

export class Betting extends React.Component<IBettingProps, IState> {
  tieAllBet: number;
  bankerAllBet: number;
  playerAllBet: number;
  constructor(props: any) {
    super(props);
    this.state = {
      tieBetCount: 0,
      bankerBetCount: 0,
      playerBetCount: 0
    };
    this.tieAllBet = 0;
    this.bankerAllBet = 0;
    this.playerAllBet = 0;
  }
  placeBetHandler(e: string) {
    if (this.props.walletAmount < Number(this.props.chipType)) {
      return;
    }
    let n: number;
    if (e === "tie") {
      n = this.state.tieBetCount;
      n += 1;
      this.setState({ tieBetCount: n });
      this.props.tieChips.push(this.props.chipType);
    } else if (e === "banker") {
      n = this.state.bankerBetCount;
      n += 1;
      this.setState({ bankerBetCount: n });
      this.props.bankerChips.push(this.props.chipType);
    } else if (e === "player") {
      n = this.state.playerBetCount;
      n += 1;
      this.setState({ playerBetCount: n });
      this.props.playerChips.push(this.props.chipType);
    }
    this.props.dispatch({
      type: ActionTypes.UPDATE_WALLET,
      payload: { walletAmount: -Number(this.props.chipType) }
    });
    this.getAllBet();
  }
  getAllBet() {
    this.tieAllBet = 0;
    this.bankerAllBet = 0;
    this.playerAllBet = 0;
    for (let i = 0; i < this.props.tieChips.length; i += 1) {
      this.tieAllBet += Number(this.props.tieChips[i]);
    }
    for (let i = 0; i < this.props.bankerChips.length; i += 1) {
      this.bankerAllBet += Number(this.props.bankerChips[i]);
    }
    for (let i = 0; i < this.props.playerChips.length; i += 1) {
      this.playerAllBet += Number(this.props.playerChips[i]);
    }
    this.props.dispatch({
      type: ActionTypes.UPDATE_BET,
      payload: {
        tieBetAmount: this.tieAllBet,
        playerBetAmount: this.playerAllBet,
        bankerBetAmount: this.bankerAllBet
      }
    });
    return this.tieAllBet + this.bankerAllBet + this.playerAllBet;
  }
  renderChips(_betCount: number, _chips: Array<string>) {
    let chips = [];
    let xCount: number = 0;
    let xPos: number = 0;
    for (let i = 0; i < _betCount; i += 1) {
      xCount += 1;
      if (xCount >= 9) {
        xPos += 1;
        xCount = 1;
      }
      chips.push(
        <div
          key={i + Math.random() * 20}
          className={"bet-chip" + " chip-url-" + _chips[i]}
          style={{ top: 50 - xCount * 5 + "px", left: 15 + xPos * 15 + "px" }}
        ></div>
      );
    }
    return chips;
  }
  renderTable() {
    let tableInfoList:Array< {name: string, amountProps: number, betCountProps: number, chipProps: Array<string>} >= [
      {
        name: "tie",
        amountProps: this.props.tieBetAmount,
        betCountProps: this.state.tieBetCount,
        chipProps: this.props.tieChips
      },
      {
        name: "banker",
        amountProps: this.props.bankerBetAmount,
        betCountProps: this.state.bankerBetCount,
        chipProps: this.props.bankerChips
      },
      {
        name: "player",
        amountProps: this.props.playerBetAmount,
        betCountProps: this.state.playerBetCount,
        chipProps: this.props.playerChips
      }
    ];
    let table = [];
    for (let i: number = 0; i < tableInfoList.length; i += 1) {
      table.push(
        <div
          key={i + Math.random() * 20} 
          className={"bet " + tableInfoList[i].name}
          onClick={this.placeBetHandler.bind(this, tableInfoList[i].name)}
        >
          <span className="place-bet-tool-tip">PLACE BET HERE</span>
          <span>
            {tableInfoList[i].name.toUpperCase()} {tableInfoList[i].amountProps}
          </span>
          <span
            className="win-flag"
            style={{ display: this.props.winner === tableInfoList[i].name ? "block" : "none" }}
          >
            win
          </span>
          {this.renderChips(tableInfoList[i].betCountProps, tableInfoList[i].chipProps)}
        </div>
      );
    }
    return table;
  }
  render() {
    return (
      <div className="table">
        {this.renderTable()}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  chipType: state.chipType,
  bankerChips: state.bankerChips,
  playerChips: state.playerChips,
  tieChips: state.tieChips,
  winner: state.winner,
  playerBetAmount: state.playerBetAmount,
  bankerBetAmount: state.bankerBetAmount,
  tieBetAmount: state.tieBetAmount,
  walletAmount: state.walletAmount
});
export default connect(mapStateToProps)(Betting);
