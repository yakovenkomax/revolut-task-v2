import React, { Component } from 'react';
import { symbols } from '../../constants/symbols';

class FormattedCurrency extends Component {
  render() {
    const { currency, value = 0, precision = 2 } = this.props;
    const symbol = symbols[currency];
    const formattedValue = (value / 10000).toFixed(precision);

    return (
      <React.Fragment>
        { symbol }{ formattedValue }
      </React.Fragment>
    );
  }
}

export default FormattedCurrency;
