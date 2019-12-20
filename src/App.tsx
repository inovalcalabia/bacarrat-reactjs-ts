import app from "./App.css";
import React, { Component } from "react";
import { Provider } from "react-redux";
import InGame from "./components/InGame";
import { createStore } from "redux";
import { any } from "prop-types";

const initalState = {
  chipType: "1",
  playerCards: "",
  bankerCards: "",
  playerBetAmount: 0,
  bankerBetAmount: 0,
  tieBetAmount: 0,
  time: 20,
  tieChips: [any],
  playerChips: [any],
  bankerChips: [any],
  playerTotalValue: 0,
  bankerTotalValue: 0,
  winAmount: 0,
  walletAmount: 10000,
  winner: "",
  lock: false
};
function reducer(state: any = initalState, action: any) {
  switch (action.type) {
    case "CHANGE_CHIP":
      return {
        ...state,
        chipType: action.payload.chipType
      };
    case "ADD_PLAYER_CARD":
      return {
        ...state,
        playerCards: state.playerCards + "," + action.payload.playerCard
      };
    case "ADD_BANKER_CARD":
      return {
        ...state,
        bankerCards: state.bankerCards + "," + action.payload.bankerCard
      };
    case "ADD_TIE_CHIPS":
      return {
        ...state,
        tieChips: state.tieChips.concat(action.payload.chips)
      };
    case "ADD_PLAYER_CHIPS":
      return {
        ...state,
        playerChips: state.playerChips.concat(action.payload.chips)
      };
    case "ADD_BANKER_CHIPS":
      return {
        ...state,
        bankerChips: state.bankerChips.concat(action.payload.chips)
      };
    case "SET_WINNER":
      return {
        ...state,
        winner: action.payload.winner,
        winAmount: action.payload.winAmount,
        walletAmount: state.walletAmount + action.payload.winAmount
      };
    case "UPDATE_WALLET":
      return {
        ...state,
        walletAmount: state.walletAmount + action.payload.walletAmount
      };
    case "UPDATE_TOTAL_VALUE":
      return {
        ...state,
        playerTotalValue: action.payload.playerTotalValue,
        bankerTotalValue: action.payload.bankerTotalValue
      };
    case "UPDATE_BET":
      return {
        ...state,
        tieBetAmount: action.payload.tieBetAmount,
        playerBetAmount: action.payload.playerBetAmount,
        bankerBetAmount: action.payload.bankerBetAmount
      };
    case "CLEAR_BET":
      return {
        ...state,
        bankerChips: [],
        playerChips: [],
        tieChips: [],
        tieBetAmount: 0,
        bankerBetAmount: 0,
        playerBetAmount: 0
      };
      case "SET_LOCK":
          return {
            ...state,
            lock: action.payload.lock
          };
    
    case "UPDATE_TIME":
      return {
        ...state,
        time: action.payload.time
      };
    case "CLEAR_GAME":
      return {
        walletAmount: state.walletAmount,
        playerCard: "",
        bankerCards: "",
        chipType: state.chipType,
        playerBetAmount: 0,
        bankerBetAmount: 0,
        tieBetAmount: 0,
        time: 20,
        bankerChips: [],
        playerChips: [],
        tieChips: [],
        playerTotalValue: 0,
        bankerTotalValue: 0,
        winner: "",
        winAmount: 0
      };
    case "CLEAR_BET":
      return {
        ...state,
        bankerChips: [],
        playerChips: [],
        tieChips: []
      };
    default:
      return state;
  }
}
const store = createStore(reducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <InGame />
        </div>
      </Provider>
    );
  }
}

export default App;
