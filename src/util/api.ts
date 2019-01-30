import convert from 'xml-js';
import { Decimal } from 'decimal.js';

type CurrencyElement = {
  attributes: {
    currency: Currency,
    rate: Decimal,
  }
}

export const fetchRates = async () => {
  try {
    const url = 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    const CORSProxy = 'https://cors-anywhere.herokuapp.com';
    const result = await fetch(`${CORSProxy}/${url}`);
    const resultXML = await result.text();
    const resultObject = convert.xml2js(resultXML);
    const ratesObjectsArray = resultObject.elements[0].elements[2].elements[0].elements;
    const rates = ratesObjectsArray.reduce((prev: CurrencyMap, curr: CurrencyElement) => {
      const key = curr.attributes.currency;
      const value = curr.attributes.rate;

      prev[key] = new Decimal(value);

      return prev;
    }, {});

    return rates;
  } catch(error) {
    console.error(error);
  }
};
