import React, { Component } from 'react';
import { connect } from 'react-redux';
import exchangeActions from '../../actions/exchange';
import CurrencySelector from '../CurrencySelector/CurrencySelector';

class ExchangeFrom extends Component {
  componentDidMount() {
    const { dispatch, currencyList } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyFrom: currencyList[0] }));
  }

  onCurrencySelect = (currencyFrom) => {
    const { dispatch } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyFrom }));
  };

  onAmountInput = (event) => {
    const { dispatch } = this.props;
    const amount = event.target.value || 0;

    dispatch(exchangeActions.updateExchangeSettings({ amount }));
  };

  renderInput() {
    const { amount } = this.props;

    return (
      <input
        value={ amount.toNumber() || '' }
        onChange={ this.onAmountInput }
      />
    );
  }

  render() {
    const { currencyList, currencyFrom, wallet } = this.props;

    return (
      <div>
        <CurrencySelector
          wallet={wallet}
          value={currencyFrom}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        { this.renderInput() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet } = state;
  const { currencyFrom, amount } = exchange;
  const currencyList = Object.keys(wallet);

  return {
    wallet,
    currencyList,
    currencyFrom,
    amount,
  };
};

export default connect(mapStateToProps)(ExchangeFrom);
