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

  if (parseFloat(wallet[currencyFrom]) < amount.toNumber()) {
    return false;
  }

  return true;
};
