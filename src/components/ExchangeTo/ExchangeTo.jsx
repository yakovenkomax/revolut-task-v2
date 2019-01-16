import React, { Component } from 'react';
import { connect } from 'react-redux';
import exchangeActions from '../../actions/exchange';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';

class ExchangeTo extends Component {
  componentDidMount() {
    const { dispatch, currencyList } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo: currencyList[1] }));
  }

  onCurrencySelect = (currencyTo) => {
    const { dispatch } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo }));
  };

  renderValue() {
    const { currencyTo, amount, rate } = this.props;
    const value = (amount * rate);

    if (!amount.toNumber()) {
      return null;
    }

    return (
      <FormattedCurrency currency={currencyTo} value={value}/>
    );
  }

  render() {
    const { currencyList, currencyTo, wallet } = this.props;

    return (
      <div>
        <CurrencySelector
          wallet={wallet}
          value={currencyTo}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        { this.renderValue() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet, rates } = state;
  const { currencyFrom, currencyTo, amount } = exchange;
  const rate = rates[currencyTo] / rates[currencyFrom];
  const currencyList = Object.keys(wallet);

  return {
    wallet,
    currencyList,
    currencyTo,
    amount,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeTo);
