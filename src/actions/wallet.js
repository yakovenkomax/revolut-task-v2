import actions from '../constants/actions';

export const exchange = (currencyFrom, currencyTo, amount, rate) => ({
  type: actions.WALLET_EXCHANGE,
  payload: {
    currencyFrom,
    currencyTo,
    amount,
    rate,
  },
});
