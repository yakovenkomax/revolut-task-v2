import actions from '../constants/actions';

const updateExchangeSettings = ({ currencyFrom, currencyTo, amount }) => ({
  type: actions.EXCHANGE_SETTINGS_UPDATE,
  payload: {
    currencyFrom,
    currencyTo,
    amount,
  },
});

export default {
  updateExchangeSettings,
}
