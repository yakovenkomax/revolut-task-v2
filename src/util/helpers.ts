import { Decimal } from 'decimal.js';

type IsExchangeAvailable = (arg: {
  currencyFrom: Currency,
  currencyTo: Currency,
  wallet: CurrencyMap,
  amount: Decimal,
  rates: CurrencyMap,
}) => boolean;

export const isExchangeAvailable: IsExchangeAvailable = ({ currencyFrom, currencyTo, wallet, amount, rates }) => {
  if (!isValidRate(rates[currencyFrom]) || !isValidRate(rates[currencyTo])) {
    return false;
  }

  if (currencyFrom === currencyTo) {
    return false;
  }

  if (!isValidAmount(amount)) {
    return false;
  }

  const walletAmount = wallet[currencyFrom];
  if (!walletAmount || walletAmount.lt(amount)) {
    return false;
  }

  return true;
};

type CalculateRate = (arg: {
  currencyFrom: Currency,
  currencyTo: Currency,
  rates: CurrencyMap,
}) => Decimal | void;

export const calculateRate: CalculateRate = ({ currencyFrom, currencyTo, rates }) => {
  const rateFrom = rates[currencyFrom];
  const rateTo = rates[currencyTo];

  if (!isValidRate(rateFrom) || !isValidRate(rateTo)) {
    return;
  }

  return rateTo.div(rateFrom);
};

export const isValidRate = (rate: Decimal | void): rate is Decimal => {
  return rate instanceof Decimal && rate.gt(0);
};

export const isValidAmount = (amount: Decimal | void): amount is Decimal => {
  return amount instanceof Decimal && amount.gt(0);
};
