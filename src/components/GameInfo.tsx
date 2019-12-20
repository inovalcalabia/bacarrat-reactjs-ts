import React from "react";
import "./../styles/styles.css";
import { getPoker } from "./../utils/Utils";
import { connect } from "react-redux";

interface IGameInfoProps {
  time: number;
  lock: boolean;
}
export class GameInfo extends React.Component<IGameInfoProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="game-info">
        <div className="time">TIME : {this.props.time}</div>
        <div className="lock" style={{display: (this.props.lock)?"block": "none"}}>LOCKED</div>
        <div className="title">Baccarat</div>
        <div className="tie-info">Tie pays 9 to 1</div>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  time: state.time,
  lock: state.lock
});
export default connect(mapStateToProps)(GameInfo);
