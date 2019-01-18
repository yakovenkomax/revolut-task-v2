import actions from '../constants/actions';

export const initialUIState = {
  amount: '',
};

export default (state = initialUIState, action) => {
  switch (action.type) {
    case actions.EXCHANGE_SETTINGS_UPDATE: {
      const { amount } = action.payload;

      return {
        ...state,
        amount,
      };
    }

    default:
      return state;
  }
}
