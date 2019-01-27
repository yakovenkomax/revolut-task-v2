import { Decimal } from 'decimal.js';
import actions from '../constants/actions';

const FAKE_WALLET: CurrencyMap = {
  EUR: new Decimal(567.89),
  GBP: new Decimal(876.5430),
  USD: new Decimal(123.4),
};

export const initialWalletState: CurrencyMap = {
  EUR: new Decimal(0),
  GBP: new Decimal(0),
  USD: new Decimal(0),
  ...FAKE_WALLET,
};

export default (state = initialWalletState, action: AppAction) => {
  let newState;

  switch (action.type) {
    case actions.WALLET_EXCHANGE: {
      const { currencyFrom, currencyTo, amount, rate } = action.payload;

      newState = { ...state };

      const amountFrom = newState[currencyFrom] as Decimal;
      const amountTo = newState[currencyTo] as Decimal;

      newState[currencyFrom] = amountFrom.minus(amount);
      newState[currencyTo] = amountTo.plus(amount.mul(rate));

      return newState;
    }

    default:
      return state;
  }
}
