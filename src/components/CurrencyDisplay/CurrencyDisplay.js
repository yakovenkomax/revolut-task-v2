import React, { Component } from 'react';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';

class CurrencyDisplay extends Component {
  render() {
    const { currency, value } = this.props;

    if (!value) {
      return null;
    }

    return (
      <div className="CurrencyDisplay">
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
