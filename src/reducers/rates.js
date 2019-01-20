import actions from '../constants/actions';
import { Decimal } from 'decimal.js';

export const initialRatesState = {
  EUR: new Decimal(1),
};

export default (state = initialRatesState, action) => {
  switch (action.type) {
    case actions.RATES_UPDATE: {
      const { rates } = action.payload;
      const decimalRates = Object.keys(rates).reduce((obj, rate) => {
          return { ...obj, [rate]: new Decimal(rates[rate]) }
        }, {});

      return {
        ...state,
        ...decimalRates,
      };
    }

    default:
      return state;
  }
}
