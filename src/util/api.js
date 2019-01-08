import { AVAILABLE_CURRENCIES } from '../constants/currency';

const ACCESS_KEY = '4203449fcaa4f52410c78cb9b19bc47a';

export const fetchRates = async (currency) => {
  try {
    const resultJSON = await fetch(`http://data.fixer.io/api/latest?access_key=${ACCESS_KEY}&base=${currency}&symbols=${AVAILABLE_CURRENCIES.join(',')}`);
    const resultObject = resultJSON.json();

    return resultObject;
  } catch(err) {
    console.error(err);
  }
}