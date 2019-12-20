import React, { Component } from 'react';
function withWeb3Alert(WrappedComponent: any) {
    return class extends Component {

        render() {
      
            return (
              <div className="logic">
                <WrappedComponent web3state={this.state} {...this.props} />
              </div>
            );
          }
    };
}