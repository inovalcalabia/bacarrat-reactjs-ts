interface IProps {
    
}

interface IState {
  count?: number;
  chip?: string;
}

import React from "react";
import "./../styles/styles.css";
import GameLogic from "../logic/GameLogic";
import GameInfo from './GameInfo';
import Cards from "./Cards";
import Betting from "./Betting";
import Controls from "./Controls";

import Blocker from './Blocker';

export class InGame extends React.Component<IProps, IState> {
  count: number;
  bettingCompRef: any;
  constructor(props: any) {
    super(props);
    this.state = {
      count: 1
    };
    this.bettingCompRef = React.createRef();

    // setInterval(()=>{var n = this.state.count;
    //     n += 1;this.setState({count: n})}, 600);
  }
  render() {
    return (
      <div className="in-game">
        <Blocker/>
        <GameLogic/>
        <div className="deck">
          <div className="deck-holder">
            <div className="lower-deck-holder"></div>
            <div className="card-deck"></div>
            <div className="upper-deck-holder"></div>
          </div>
        </div>
        <GameInfo/>
        <Cards />
        <Betting />
        <Controls />
      </div>
    );
  }
}
export default InGame;
