import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import { loaderIds } from '../../constants/ids';
import Loader from '../Loader/Loader';

import s from './ExchangeRate.module.css';

class ExchangeRate extends Component {
  render() {
    const { currencyFrom, currencyTo, inProgress, rate } = this.props;

    return (
      <div className={s.root}>
        { inProgress ? (
          <Loader />
        ) : (
          <React.Fragment>
            <FormattedCurrency currency={currencyFrom} value={1} precision={0} />
            {' = '}
            <FormattedCurrency currency={currencyTo} value={rate} precision={4} />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, rates, loaders } = state;
  const inProgress = loaders[loaderIds.RATES_UPDATE_LOADER];
  const { currencyFrom, currencyTo } = exchange;
  const rate = rates[currencyTo] / rates[currencyFrom];

  return {
    currencyFrom,
    currencyTo,
    inProgress,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeRate);
