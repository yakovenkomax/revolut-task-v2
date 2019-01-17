import React, { Component } from 'react';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import { currencyDisplayTexts } from '../../constants/text';

import s from './CurrencyDisplay.module.css';

class CurrencyDisplay extends Component {
  render() {
    const { currency, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div className={s.root}>
        <div className={s.currency}>
          {currency}
        </div>
        <div className={s.wallet}>
          {currencyDisplayTexts.prefix}
          {' '}
          <FormattedCurrency currency={currency} value={value}/>
        </div>
      </div>
    );
  }
}

export default CurrencyDisplay;
