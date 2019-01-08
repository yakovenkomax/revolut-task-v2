import actions from '../constants/actions';

const FAKE_WALLET = {
  usd: 1234000,
  gbp: 8765430,
  eur: 5678900,
}

export const initialWalletState = {
  usd: 0,
  gbp: 0,
  eur: 0,
  ...FAKE_WALLET,
}

export default (state = initialWalletState, action) => {
  let newState;

  switch (action.type) {
    case actions.WALLET_EXCHANGE: {
      const { currencyFrom, currencyTo, amount, rate } = action.params;

      newState = { ...state };

      newState[currencyFrom] = newState[currencyFrom] - amount;
      newState[currencyTo] = newState[currencyTo] + amount * rate;

      return newState;
    }

    default:
      return state;
  }
}
