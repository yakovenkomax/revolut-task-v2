import React from 'react';
import { connect } from 'react-redux';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import Loader from '../Loader/Loader';
import { loaderIds } from '../../constants/ids';
import text from '../../constants/text';

import s from './ExchangeRate.module.css';

import { Decimal } from 'decimal.js';
import { calculateRate } from '../../util/helpers';

interface Props {
  currencyFrom: Currency,
  currencyTo: Currency,
  inProgress: boolean | void,
  rate: Decimal | void,
}

class ExchangeRate extends React.PureComponent<Props> {
  renderContent() {
    const { currencyFrom, currencyTo, inProgress, rate } = this.props;

    if (inProgress) {
      return <Loader />;
    }

    if (!rate) {
      return text.unavailablePlaceholder;
    }

    return (
      <React.Fragment>
        <FormattedCurrency currency={currencyFrom} value={new Decimal(1)} precision={0} />
        {' = '}
        <FormattedCurrency currency={currencyTo} value={rate} precision={4} />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={s.root}>
        { this.renderContent() }
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  const { form, rates, loaders } = state;
  const inProgress = loaders[loaderIds.RATES_UPDATE_LOADER];
  const { currencyFrom, currencyTo } = form;
  const rate = calculateRate({ currencyFrom, currencyTo, rates });

  return {
    currencyFrom,
    currencyTo,
    inProgress,
    rate,
  };
};

export default connect(mapStateToProps)(ExchangeRate);
