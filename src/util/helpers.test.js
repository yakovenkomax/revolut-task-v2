import { isExchangeAvailable } from './helpers';
import { rates1, rates2, wallet1, wallet2 } from '../test/fixtures';
import { Decimal } from 'decimal.js';

describe('exchangeHelpers util', () => {
  describe('isExchangeAvailable', () => {
    it('should return false currencyFrom rate or currencyTo rate is unavailable', () => {
      const isAvailable = isExchangeAvailable("EUR", "GBP", wallet1, new Decimal(1), rates1);

      expect(isAvailable).toEqual(false);
    });

    it('should return false on equal currencyFrom and currencyTo', () => {
      const isAvailable = isExchangeAvailable("EUR", "EUR", wallet1, new Decimal(1), rates2);

      expect(isAvailable).toEqual(false);
    });

    it('should return false on zero amount', () => {
      const isAvailable = isExchangeAvailable("EUR", "GBP", wallet1, new Decimal(0), rates2);

      expect(isAvailable).toEqual(false);
    });

    it('should return false if not enough funds in the wallet', () => {
      const isAvailable = isExchangeAvailable("EUR", "GBP", wallet2, new Decimal(1), rates2);

      expect(isAvailable).toEqual(false);
    });

    it('should return true on valid input', () => {
      const isAvailable = isExchangeAvailable("EUR", "GBP", wallet1, new Decimal(1), rates2);

      expect(isAvailable).toEqual(true);
    });
  });
});
