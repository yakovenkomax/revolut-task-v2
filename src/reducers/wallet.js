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

export default function exchange(state = initialWalletState, action) {
  let newState;

  switch (action.type) {
    case actions.WALLET_EXCHANGE: {
      const { currencyFrom, currencyTo, amount, rate } = action.params;

      newState = { ...state };

      newState.wallet[currencyFrom] = newState.wallet[currencyFrom] - amount;
      newState.wallet[currencyTo] = newState.wallet[currencyTo] + amount * rate;

      return newState;
    }

    default:
      return state;
  }
}
