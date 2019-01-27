import React, { SyntheticEvent } from 'react';
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

import { Decimal } from 'decimal.js';
import { ThunkDispatch } from 'redux-thunk';

const FETCH_INTERVAL = 10000; // ms

interface Props {
  currencyFrom: Currency,
  currencyTo: Currency,
  inProgress: boolean | void,
  enabled: boolean,
  wallet: CurrencyMap,
  amount: Decimal,
  rate: Decimal | void,
  dispatch: ThunkDispatch<AppState, null, AppAction>,
}

class App extends React.PureComponent<Props> {
  componentDidMount() {
    this.updateRates();

    setInterval(this.updateRates, FETCH_INTERVAL);
  }

  updateRates = () => {
    this.props.dispatch(ratesActions.updateRates());
  };

  handleCurrencyFromChange = (currencyFrom: Currency) => {
    this.props.dispatch(exchangeActions.updateForm({ currencyFrom }));
  };

  handleCurrencyToChange = (currencyTo: Currency) => {
    this.props.dispatch(exchangeActions.updateForm({ currencyTo }));
  };

  handleAmountChange = (amount: Decimal) => {
    this.props.dispatch(exchangeActions.updateForm({ amount }))
  };

  handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.dispatch(walletActions.exchangeCurrency());
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

const mapStateToProps = (state: AppState) => {
  const { form, wallet, rates, loaders } = state;
  const { currencyFrom, currencyTo, amount } = form;
  const inProgress = loaders[loaderIds.RATES_UPDATE_LOADER];
  const rate = calculateRate({ currencyFrom, currencyTo, rates });
  const enabled = isExchangeAvailable({ currencyFrom, currencyTo, wallet, amount, rates });

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
