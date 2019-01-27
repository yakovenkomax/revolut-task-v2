type CurrencySymbolMap = {
  [key in Currency]?: string;
};

export const symbols: CurrencySymbolMap = {
  USD: '$',
  GBP: '£',
  EUR: '€',
};
