import actions from '../constants/actions';
import wallet from './wallet';
import { Decimal } from 'decimal.js';

const state1 = {
  EUR: new Decimal(10),
  GBP: new Decimal(5),
  USD: new Decimal(0),
};

const state2 = {
  EUR: new Decimal(7),
  GBP: new Decimal(5),
  USD: new Decimal(4.5),
};

const anyAction = { type: '' };

type CreateExchangeAction = (arg: {
    currencyFrom: Currency,
    currencyTo: Currency,
    amount: Decimal,
    rate: Decimal,
  }) => AppAction;

const createExchangeAction: CreateExchangeAction = ({ currencyFrom, currencyTo, amount, rate }) => {
  return {
    type: actions.WALLET_EXCHANGE,
    payload: { currencyFrom, currencyTo, amount, rate },
  };
};

describe('wallet reducer', () => {
  describe('WALLET_EXCHANGE', () => {
    it('should return unmodified state by default', () => {
      const actual = wallet(state1, anyAction as AppAction);
      const expected = state1;

      expect(actual).toEqual(expected);
    });

    it('should properly add and subtract funds', () => {
      const actual = wallet(state1, createExchangeAction({
        currencyFrom: 'EUR',
        currencyTo: 'USD',
        amount: new Decimal(3),
        rate: new Decimal(1.5),
      }));
      const expected = state2;

      expect(actual).toEqual(expected);
    });
  });
});
