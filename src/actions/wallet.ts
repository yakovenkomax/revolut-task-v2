import actions from '../constants/actions';
import { Decimal } from 'decimal.js';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { calculateRate, isExchangeAvailable } from '../util/helpers';

export type ExchangeCurrencyAction = {
  type: typeof actions.WALLET_EXCHANGE,
  payload: {
    currencyFrom: Currency,
    currencyTo: Currency,
    amount: Decimal,
    rate: Decimal,
  },
}

type ExchangeCurrencyThunkAction = ThunkAction<void, AppState, null, ExchangeCurrencyAction>;

const exchangeCurrency = (): ExchangeCurrencyThunkAction => (dispatch: Dispatch, getState) => {
  const state = getState();
  const { form, rates, wallet } = state;
  const { currencyFrom, currencyTo, amount } = form;
  const rate = calculateRate({ currencyFrom, currencyTo, rates });
  const available = isExchangeAvailable({ currencyFrom, currencyTo, wallet, amount, rates });

  if (available) {
    dispatch({
      type: actions.WALLET_EXCHANGE,
      payload: {
        currencyFrom,
        currencyTo,
        amount,
        rate,
      },
    });
  }
};

export default {
  exchangeCurrency,
}
