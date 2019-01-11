import { Decimal } from 'decimal.js';
import actions from '../constants/actions';

const FAKE_WALLET = {
  USD: new Decimal(123.4),
  GBP: new Decimal(876.5430),
  EUR: new Decimal(567.89),
};

export const initialWalletState = {
  USD: new Decimal(0),
  GBP: new Decimal(0),
  EUR: new Decimal(0),
  ...FAKE_WALLET,
};

export default (state = initialWalletState, action) => {
  let newState;

  switch (action.type) {
    case actions.WALLET_EXCHANGE: {
      const { currencyFrom, currencyTo, amount, rate } = action.payload;

      newState = { ...state };

      newState[currencyFrom] = newState[currencyFrom].minus(amount);
      newState[currencyTo] = newState[currencyTo].plus(amount * rate);

      return newState;
    }

    default:
      return state;
  }
}
