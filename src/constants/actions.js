import keymirror from 'keymirror';

const actions = keymirror({
  RATES_UPDATE: null,
  WALLET_EXCHANGE: null,
  EXCHANGE_SETTINGS_UPDATE: null,

  LOADER_START: null,
  LOADER_END: null,
});

export default actions;
