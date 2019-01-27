import { Decimal } from 'decimal.js';
import { LoaderId } from './constants/ids';
import { UpdateFormAction } from './actions/form';
import { StartLoaderAction, StopLoaderAction } from './actions/loaders';
import { UpdateRatesAction } from './actions/rates';
import { ExchangeCurrencyAction } from './actions/wallet';

declare global {
  export type Currency =
    | 'EUR'
    | 'USD'
    | 'JPY'
    | 'BGN'
    | 'CZK'
    | 'DKK'
    | 'GBP'
    | 'HUF'
    | 'PLN'
    | 'RON'
    | 'SEK'
    | 'CHF'
    | 'ISK'
    | 'NOK'
    | 'HRK'
    | 'RUB'
    | 'TRY'
    | 'AUD'
    | 'BRL'
    | 'CAD'
    | 'CNY'
    | 'HKD'
    | 'IDR'
    | 'ILS'
    | 'INR'
    | 'KRW'
    | 'MXN'
    | 'MYR'
    | 'NZD'
    | 'PHP'
    | 'SGD'
    | 'THB'
    | 'ZAR';

  export type CurrencyMap = {
    [key in CurrencyType]?: Decimal;
  };

  export type AppState = {
    wallet: CurrencyMapType,
    rates: CurrencyMapType,
    form: {
      currencyFrom: CurrencyType,
      currencyTo: CurrencyType,
      amount: Decimal,
    },
    loaders: {
      [key in LoaderIdType]: boolean
    },
  };

  export type AppAction =
    | UpdateFormAction
    | StartLoaderAction
    | StopLoaderAction
    | UpdateRatesAction
    | ExchangeCurrencyAction;
}
