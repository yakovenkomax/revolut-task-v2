import actions from '../constants/actions';
import { loaderIds } from '../constants/ids';
import { fetchRates } from '../util/api';
import { startLoader, stopLoader } from './loaders';

import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type UpdateRatesAction = {
  type: typeof actions.RATES_UPDATE,
  payload: {
    rates: CurrencyMap,
  },
}

type UpdateRatesThunkAction = ThunkAction<void, AppState, null, UpdateRatesAction>;

const updateRates = (): UpdateRatesThunkAction => async (dispatch: Dispatch, getState) => {
  const ratesLoaded = Object.keys(getState().rates).length > 1;

  if (!ratesLoaded) {
    dispatch(startLoader({ loaderId: loaderIds.RATES_UPDATE_LOADER }));
  }
  try {
    const rates = await fetchRates();

    dispatch({
      type: actions.RATES_UPDATE,
      payload: {
        rates,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    if (!ratesLoaded) {
      dispatch(stopLoader({ loaderId: loaderIds.RATES_UPDATE_LOADER }));
    }
  }
};

export default {
  updateRates,
}
