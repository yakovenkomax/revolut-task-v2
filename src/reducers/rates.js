import actions from '../constants/actions';

export const initialRatesState = {
  EUR: "1",
}

export default (state = initialRatesState, action) => {
  switch (action.type) {
    case actions.RATES_UPDATE: {
      const { rates } = action.payload;

      return {
        ...state,
        ...rates,
      };
    }

    default:
      return state;
  }
}
