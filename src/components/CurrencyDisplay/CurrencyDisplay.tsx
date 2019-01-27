import React from 'react';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import text from '../../constants/text';

import s from './CurrencyDisplay.module.css';
import { Decimal } from 'decimal.js';

interface Props {
  currency: Currency,
  value?: Decimal,
}

class CurrencyDisplay extends React.PureComponent<Props> {
  render() {
    const { currency, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div className={s.root}>
        <div className={s.currency}>
          { currency }
        </div>
        <div className={s.wallet}>
          { text.currencyDisplayPrefix }
          { ' ' }
          <FormattedCurrency currency={currency} value={value}/>
        </div>
      </div>
    );
  }
}

export default CurrencyDisplay;
