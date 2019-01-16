import React, { Component } from 'react';
import { connect } from 'react-redux';

import walletActions from '../../actions/wallet';

class ExchangeButton extends Component {
  onClick = () => {
    const { dispatch } = this.props;

    dispatch(walletActions.exchange())
  };

  render() {
    return (
      <button
        onClick={this.onClick}
      >
        Exchange
      </button>
    );
  }
}

export default connect()(ExchangeButton);
