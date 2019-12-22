import React from "react";
import { connect } from "react-redux";

interface IBlockerProps {
  lock: boolean;
}
export class Blocker extends React.Component<IBlockerProps, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="blocker" style={{display: (this.props.lock)? "block": "none"}}>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => ({
  lock: state.lock
});
export default connect(mapStateToProps)(Blocker);
