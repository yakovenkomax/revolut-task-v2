import React, { Component } from 'react';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';

import s from './CurrencyDisplay.module.css';

class CurrencyDisplay extends Component {
  render() {
    const { currency, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div className={s.root}>
        <div>
          currency: {currency}
        </div>
        <div>
          you have:
          <FormattedCurrency currency={currency} value={value}/>
        </div>
      </div>
    );
  }
}

export default CurrencyDisplay;
