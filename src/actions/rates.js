import actions from '../constants/actions';
import { fetchRates } from '../util/api';

const update = (currencyList) => (dispatch, getState) => {
  currencyList.forEach(async (currency) => {
    const rates = await fetchRates(currency);

    dispatch({
      type: actions.RATES_UPDATE,
      payload: {
        currency,
        rates,
      },
    });
  })
};

export default {
  update,
}