import actions from '../constants/actions';
import { loaderIds } from '../constants/ids';
import { fetchRates } from '../util/api';
import { startLoader, stopLoader } from './loaders';

const update = () => async (dispatch) => {
  dispatch(startLoader({ loaderId: loaderIds.RATES_UPDATE_LOADER }));
  const rates = await fetchRates();
  dispatch(stopLoader({ loaderId: loaderIds.RATES_UPDATE_LOADER }));

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
