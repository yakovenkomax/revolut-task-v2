import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormattedRate from '../FormattedRate/FormattedRate';

class ExchangeRate extends Component {
  render() {
    const { currencyFrom, currencyTo, rate } = this.props;

    return (
      <div>
        <FormattedRate currency={currencyFrom} value={1} />
        =
        <FormattedRate currency={currencyTo} value={rate} precision={4} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, rates } = state;
  const { currencyFrom, currencyTo } = exchange;
  const rate = rates[currencyTo] / rates[currencyFrom];

  return {
    currencyFrom,
    currencyTo,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeRate);
