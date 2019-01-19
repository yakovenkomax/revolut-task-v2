import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import walletActions from '../../actions/wallet';
import { isExchangeAvailable } from '../../util/exchangeHelpers';

import s from './ExchangeButton.module.css';

class ExchangeButton extends Component {
  onClick = () => {
    const { dispatch, currencyFrom, currencyTo, wallet, amount, rates } = this.props;
    const isEnabled = isExchangeAvailable(currencyFrom, currencyTo, wallet, amount, rates);

    if (isEnabled) {
      dispatch(walletActions.exchange());
    }
  };

  render() {
    const { currencyFrom, currencyTo, wallet, amount, rates } = this.props;
    const isEnabled = isExchangeAvailable(currencyFrom, currencyTo, wallet, amount, rates);
    const buttonClassName = classNames(s.root, { [s.disabled]: !isEnabled });

    return (
      <button
        className={buttonClassName}
        onClick={this.onClick}
      >
        Exchange
      </button>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet, rates } = state;
  const { currencyFrom, currencyTo, amount } = exchange;

  return {
    currencyFrom,
    currencyTo,
    wallet,
    amount,
    rates
  };
};

export default connect(mapStateToProps)(ExchangeButton);
