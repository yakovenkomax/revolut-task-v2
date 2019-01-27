import actions from '../constants/actions';
import { Decimal } from 'decimal.js';

export const initialRatesState: CurrencyMap = {
  EUR: new Decimal(1),
};

export default (state = initialRatesState, action: AppAction) => {
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
