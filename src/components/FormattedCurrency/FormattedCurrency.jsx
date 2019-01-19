import React, { Component } from 'react';
import { symbols } from '../../constants/symbols';

class FormattedCurrency extends Component {
  render() {
    const { currency, value, precision = 2 } = this.props;

    if (isNaN(value)) {
      return null;
    }

    const symbol = symbols[currency];
    const formattedValue = value.toFixed(precision);

    return (
      <React.Fragment>
        { symbol }{ formattedValue }
      </React.Fragment>
    );
  }
}

export default FormattedCurrency;
