import actions from '../constants/actions';
import { fetchRates } from '../util/api';

const update = () => async (dispatch, getState) => {
  const rates = await fetchRates();

  dispatch({
    type: actions.RATES_UPDATE,
    payload: {
      rates,
    },
  });
};

export default {
  update,
}