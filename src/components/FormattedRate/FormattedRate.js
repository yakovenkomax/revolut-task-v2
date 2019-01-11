import React, { Component } from 'react';
import { symbols } from '../../constants/symbols';

class FormattedRate extends Component {
  render() {
    const { currency, value = 0, precision = 4 } = this.props;
    const symbol = symbols[currency];
    const formattedValue = value.toFixed(precision);

    return (
      <React.Fragment>
        { symbol }{ formattedValue }
      </React.Fragment>
    );
  }
}

export default FormattedRate;
