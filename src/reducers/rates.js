import actions from '../constants/actions';

export const initialRatesState = {
  usd: {
    gbp: null,
    eur: null,
  },
  gbp: {
    usd: null,
    eur: null,
  },
  eur: {
    usd: null,
    gbp: null,
  },
}

export default function fetch(state = initialRatesState, action) {
  let newState;

  switch (action.type) {
    case actions.RATES_FETCH: {
      const { currency, rates } = action.params;
      newState = { ...state };

      newState.rates[currency] = rates;

      return newState;
    }

    default:
      return state;
  }
}
