import actions from '../constants/actions';

const FAKE_WALLET = {
  USD: 1234000,
  GBP: 8765430,
  EUR: 5678900,
};

export const initialWalletState = {
  USD: 0,
  GBP: 0,
  EUR: 0,
  ...FAKE_WALLET,
};

export default (state = initialWalletState, action) => {
  let newState;

  switch (action.type) {
    case actions.WALLET_EXCHANGE: {
      const { currencyFrom, currencyTo, amount, rate } = action.payload;

      newState = { ...state };

      newState[currencyFrom] = newState[currencyFrom] - amount;
      newState[currencyTo] = newState[currencyTo] + amount * rate;

      return newState;
    }

    default:
      return state;
  }
}
