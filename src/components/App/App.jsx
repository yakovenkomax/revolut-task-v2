import React from 'react';
import { connect } from 'react-redux';

import ExchangeRate from '../ExchangeRate/ExchangeRate';
import Button from '../Button/Button';
import ExchangeFrom from '../ExchangeFrom/ExchangeFrom';
import ExchangeTo from '../ExchangeTo/ExchangeTo';

import ratesActions from '../../actions/rates';
import walletActions from '../../actions/wallet';
import exchangeActions from '../../actions/form';

import { calculateRate, isExchangeAvailable } from '../../util/helpers';

import text from '../../constants/text';
import { loaderIds } from '../../constants/ids';

import s from './App.module.css';

class App extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch(ratesActions.update());
  }

  handleCurrencyFromChange = (currencyFrom) => {
    this.props.dispatch(exchangeActions.updateForm({ currencyFrom }));
  };

  handleCurrencyToChange = (currencyTo) => {
    this.props.dispatch(exchangeActions.updateForm({ currencyTo }));
  };

  handleAmountChange = (amount) => {
    this.props.dispatch(exchangeActions.updateForm({ amount }))
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.dispatch(walletActions.exchange());
  };

  render() {
    const { currencyFrom, currencyTo, inProgress, enabled, wallet, amount, rate } = this.props;

    return (
      <form
        className={s.root}
        onSubmit={this.handleSubmit}
      >
        <header className={s.header}>
          <div className={s.headerLeft}>
          </div>
          <div className={s.headerCenter}>
            <ExchangeRate />
          </div>
          <div className={s.headerRight}>
            <Button
              type="submit"
              text={text.exchangeButtonText}
              disabled={!enabled}
            />
          </div>
        </header>
        <main className={s.main}>
          <ExchangeFrom
            wallet={wallet}
            amount={amount}
            currencyFrom={currencyFrom}
            onChange={this.handleCurrencyFromChange}
            onInput={this.handleAmountChange}
          />
          <ExchangeTo
            currencyFrom={currencyFrom}
            currencyTo={currencyTo}
            inProgress={inProgress}
            wallet={wallet}
            amount={amount}
            rate={rate}
            onChange={this.handleCurrencyToChange}
          />
        </main>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet, rates, loaders } = state;
  const { currencyFrom, currencyTo, amount } = exchange;
  const inProgress = loaders[loaderIds.RATES_UPDATE_LOADER];
  const rate = calculateRate(rates, currencyFrom, currencyTo);
  const enabled = isExchangeAvailable(currencyFrom, currencyTo, wallet, amount, rates);

  return {
    currencyFrom,
    currencyTo,
    inProgress,
    enabled,
    wallet,
    amount,
    rate,
  };
};

export default connect(mapStateToProps)(App);
