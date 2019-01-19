import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import exchangeActions from '../../actions/exchange';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import { loaderIds } from '../../constants/ids';

import s from './ExchangeTo.module.css';

class ExchangeTo extends Component {
  componentDidMount() {
    const { dispatch, currencyList } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo: currencyList[1] }));
  }

  onCurrencySelect = (currencyTo) => {
    const { dispatch } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo }));
  };

  renderAmount() {
    const { amount, rate } = this.props;

    if (!rate) {
      return null;
    }

    const value = (amount * rate).toFixed(2);
    const valueClassName = classNames(s.value, {[s.valueLong]: value.length > 7});

    return (
      <div className={valueClassName}>
        { amount.toNumber()
          ? value
          : ' '
        }
      </div>
    );
  }

  renderRates() {
    const { currencyFrom, currencyTo, inProgress, rate } = this.props;

    if (inProgress || !rate) {
      return null;
    }

    return (
      <div className={s.rate}>
        <FormattedCurrency currency={currencyTo} value={1} precision={0} />
        {' = '}
        <FormattedCurrency currency={currencyFrom} value={1 / rate} precision={2} />
      </div>
    );
  }

  render() {
    const { currencyList, currencyTo, wallet } = this.props;

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          value={currencyTo}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        <div className={s.amount}>
          { this.renderAmount() }
          { this.renderRates() }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet, rates, loaders } = state;
  const inProgress = loaders[loaderIds.RATES_UPDATE_LOADER];
  const { currencyFrom, currencyTo, amount } = exchange;
  const rate = rates[currencyTo] / rates[currencyFrom];
  const currencyList = Object.keys(wallet);

  return {
    currencyList,
    currencyFrom,
    currencyTo,
    inProgress,
    wallet,
    amount,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeTo);
