import { Decimal } from 'decimal.js';
import actions from '../constants/actions';

export const initialExchangeState = {
  currencyFrom: '',
  currencyTo: '',
  amount: new Decimal(0),
};

export default (state = initialExchangeState, action) => {
  let newState;

  switch (action.type) {
    case actions.EXCHANGE_SETTINGS_UPDATE: {
      const { currencyFrom, currencyTo, amount } = action.payload;

      newState = { ...state };

      if (currencyFrom) {
        newState.currencyFrom = currencyFrom;
      }

      if (currencyTo) {
        newState.currencyTo = currencyTo;
      }

      if (typeof amount !== 'undefined') {
        newState.amount = new Decimal(amount);
      }

      return newState;
    }

    default:
      return state;
  }
}
