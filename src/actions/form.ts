import actions from '../constants/actions';
import { Decimal } from 'decimal.js';

type UpdateFormParamsType = {
  currencyFrom?: Currency,
  currencyTo?: Currency,
  amount?: Decimal,
}

export type UpdateFormAction = {
  type: typeof actions.FORM_UPDATE,
  payload: {
    currencyFrom?: Currency,
    currencyTo?: Currency,
    amount?: Decimal,
  }
}

const updateForm = ({ currencyFrom, currencyTo, amount }: UpdateFormParamsType): UpdateFormAction => ({
  type: actions.FORM_UPDATE,
  payload: {
    currencyFrom,
    currencyTo,
    amount,
  },
});

export default {
  updateForm,
}
