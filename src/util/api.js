import convert from 'xml-js';

export const fetchRates = async () => {
  try {
    const result = await fetch('https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml');
    const resultXML = await result.text();
    const resultObject = convert.xml2js(resultXML);
    const ratesObjectsArray = resultObject.elements[0].elements[2].elements[0].elements;
    const rates = ratesObjectsArray.reduce((prev, curr) => {
      const key = curr.attributes.currency;
      const value = curr.attributes.rate;

      prev[key] = value;

      return prev;
    }, {})

    return rates;
  } catch(err) {
    console.error(err);
  }
}