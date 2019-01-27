import { calculateRate, isExchangeAvailable, isValidAmount, isValidRate } from './helpers';
import { Decimal } from 'decimal.js';

const wallet1 = {
  EUR: new Decimal(100),
  GBP: new Decimal(200),
  USD: new Decimal(300),
};

const wallet2 = {
  EUR: new Decimal(0),
  GBP: new Decimal(0.001),
  USD: new Decimal(123),
};

const rates1 = {
  EUR: new Decimal(1),
  USD: new Decimal(0.85),
};

const rates2 = {
  EUR: new Decimal(1),
  GBP: new Decimal(1.234),
  USD: new Decimal(0.85),
};

describe('helpers', () => {
  describe('isExchangeAvailable', () => {
    it('should return false currencyFrom rate or currencyTo rate is unavailable', () => {
      const actual = isExchangeAvailable({
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        wallet: wallet1,
        amount: new Decimal(1),
        rates: rates1,
      });

      const expected = false;

      expect(actual).toEqual(expected);
    });

    it('should return false on equal currencyFrom and currencyTo', () => {
      const actual = isExchangeAvailable({
        currencyFrom: 'EUR',
        currencyTo: 'EUR',
        wallet: wallet1,
        amount: new Decimal(1),
        rates: rates2,
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });

    it('should return false on zero amount', () => {
      const actual = isExchangeAvailable({
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        wallet: wallet1,
        amount: new Decimal(0),
        rates: rates2,
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });

    it('should return false if not enough funds in the wallet', () => {
      const actual = isExchangeAvailable({
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        wallet: wallet2,
        amount: new Decimal(1),
        rates: rates2,
      });
      const expected = false;

      expect(actual).toEqual(expected);
    });

    it('should return true on valid input', () => {
      const actual = isExchangeAvailable({
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        wallet: wallet1,
        amount: new Decimal(1),
        rates: rates2,
      });
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('calculateRate', () => {
    it('should return undefined for invalid or unavailable currencyFrom or currencyTo rate', () => {
      const actual = calculateRate({
        currencyFrom: 'EUR',
        currencyTo: 'GBP',
        rates: rates1,
      });
      const expected = undefined;

      expect(actual).toEqual(expected);
    });

    it('should properly calculate rate', () => {
      const actual = calculateRate({
        currencyFrom: 'GBP',
        currencyTo: 'USD',
        rates: rates2,
      });
      const expected = new Decimal('0.68881685575364667747');

      expect(actual).toEqual(expected);
    });
  });

  describe('isValidRate', () => {
    it('should return false for invalid rate', () => {
      const actual1 = isValidRate(new Decimal(-1));
      const actual2 = isValidRate();
      const expected = false;

      expect(actual1).toEqual(expected);
      expect(actual2).toEqual(expected);
    });

    it('should return true for valid rate', () => {
      const actual = isValidRate(new Decimal(1.2236));
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });

  describe('isValidAmount', () => {
    it('should return false for invalid rate', () => {
      const actual1 = isValidAmount(new Decimal(-1));
      const actual2 = isValidAmount();
      const expected = false;

      expect(actual1).toEqual(expected);
      expect(actual2).toEqual(expected);
    });

    it('should return true for invalid rate', () => {
      const actual = isValidAmount(new Decimal(1.2236));
      const expected = true;

      expect(actual).toEqual(expected);
    });
  });
});
