import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import exchangeActions from '../../actions/exchange';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';

import s from './ExchangeTo.module.css';
import { loaderIds } from '../../constants/ids';

class ExchangeTo extends Component {
  componentDidMount() {
    const { dispatch, currencyList } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo: currencyList[1] }));
  }

  onCurrencySelect = (currencyTo) => {
    const { dispatch } = this.props;

    dispatch(exchangeActions.updateExchangeSettings({ currencyTo }));
  };

  render() {
    const { currencyList, currencyFrom, currencyTo, inProgress, amount, rate, wallet } = this.props;
    const value = (amount * rate).toFixed(2);
    const valueClassName = classNames(s.value, {[s.valueLong]: value.length > 7});

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          value={currencyTo}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        <div className={s.amount}>
          <div className={valueClassName}>
            { amount.toNumber()
              ? value
              : ' '
            }
          </div>
          { !inProgress && (
            <div className={s.rate}>
              <FormattedCurrency currency={currencyTo} value={1} precision={0} />
              {' = '}
              <FormattedCurrency currency={currencyFrom} value={1 / rate} precision={2} />
            </div>
          )}
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
    wallet,
    currencyList,
    currencyFrom,
    currencyTo,
    inProgress,
    amount,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeTo);
