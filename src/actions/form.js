import actions from '../constants/actions';

const updateForm = ({ currencyFrom, currencyTo, amount }) => ({
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
