

interface IState {
  count?: number;
  chip?: string;
}
import React from "react";
import GameLogic from "../logic/GameLogic";
import GameInfo from './GameInfo';
import Cards from "./Cards";
import Betting from "./Betting";
import Controls from "./Controls";
import Blocker from './Blocker';

export class InGame extends React.Component<any, IState> {
  count: number;
  bettingCompRef: any;
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={"in-game"} >
        <Blocker/>
        <GameLogic/>
        <GameInfo/>
        <Cards />
        <Betting />
        <Controls />
      </div>
    );
  }
}
export default InGame;
