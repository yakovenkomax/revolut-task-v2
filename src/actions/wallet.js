import actions from '../constants/actions';

const exchange = () => (dispatch, getState) => {
  const state = getState();
  const { exchange, rates } = state;
  const { currencyFrom, currencyTo, amount } = exchange;
  const rate = rates[currencyTo] / rates[currencyFrom];

  dispatch({
    type: actions.WALLET_EXCHANGE,
    payload: {
      currencyFrom,
      currencyTo,
      amount,
      rate,
    },
  });
};

export default {
  exchange,
}