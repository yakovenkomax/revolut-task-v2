import { Decimal } from 'decimal.js';

export const isExchangeAvailable = (currencyFrom, currencyTo, wallet, amount, rates) => {
  if (!isValidRate(rates[currencyFrom]) || !isValidRate(rates[currencyTo])) {
    return false;
  }

  if (currencyFrom === currencyTo) {
    return false;
  }

  if (!isValidAmount(amount)) {
    return false;
  }

  if (wallet[currencyFrom].lt(amount)) {
    return false;
  }

  return true;
};

export const calculateRate = (rates, currencyFrom, currencyTo) => {
  if (!isValidRate(rates[currencyFrom]) || !isValidRate(rates[currencyTo])) {
    return;
  }

  return rates[currencyTo].div(rates[currencyFrom]);
};

export const isValidRate = (rate) => {
  return rate instanceof Decimal && rate.gt(0);
};

export const isValidAmount = (amount) => {
  return amount instanceof Decimal && amount.gt(0);
};
