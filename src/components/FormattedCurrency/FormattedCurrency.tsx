import React from 'react';
import { symbols } from '../../constants/symbols';
import { Decimal } from 'decimal.js';

interface Props {
  currency: Currency,
  value: Decimal,
  precision?: number,
}

class FormattedCurrency extends React.PureComponent<Props> {
  render() {
    const { currency, value, precision = 2 } = this.props;

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
