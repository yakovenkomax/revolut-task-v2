export const isExchangeAvailable = (currencyFrom, currencyTo, wallet, amount, rates) => {
  if (!rates[currencyFrom] || !rates[currencyTo]) {
    return false;
  }

  if (currencyFrom === currencyTo) {
    return false;
  }

  if (!amount) {
    return false;
  }

  if (wallet[currencyFrom] < amount) {
    return false;
  }

  return true;
};
