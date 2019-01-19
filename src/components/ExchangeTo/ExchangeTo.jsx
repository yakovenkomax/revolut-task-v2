import React from 'react';
import classNames from 'classnames';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';

import s from './ExchangeTo.module.css';

class ExchangeTo extends React.PureComponent {
  onCurrencySelect = (currencyTo) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(currencyTo);
    }
  };

  renderAmount() {
    const { amount, rate } = this.props;

    if (!rate || !amount.toNumber()) {
      return null;
    }

    const value = (amount * rate).toFixed(2);
    const valueClassName = classNames(s.value, {[s.valueLong]: value.length > 7});

    return (
      <div className={valueClassName}>
        { value }
      </div>
    );
  }

  renderRates() {
    const { currencyFrom, currencyTo, inProgress, rate } = this.props;

    if (inProgress || !rate) {
      return null;
    }

    return (
      <div className={s.rate}>
        <FormattedCurrency currency={currencyTo} value={1} precision={0} />
        {' = '}
        <FormattedCurrency currency={currencyFrom} value={1 / rate} precision={2} />
      </div>
    );
  }

  render() {
    const { currencyTo, wallet } = this.props;
    const currencyList = Object.keys(wallet);

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          value={currencyTo}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        <div className={s.amount}>
          { this.renderAmount() }
          { this.renderRates() }
        </div>
      </div>
    );
  }
}

export default ExchangeTo;
