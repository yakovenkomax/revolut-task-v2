import React from 'react';
import classNames from 'classnames';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import FormattedCurrency from '../FormattedCurrency/FormattedCurrency';
import { isValidAmount, isValidRate } from '../../util/helpers';

import s from './ExchangeTo.module.css';
import { Decimal } from 'decimal.js';

interface Props {
  currencyFrom: Currency,
  currencyTo: Currency,
  inProgress: boolean | void,
  wallet: CurrencyMap,
  amount: Decimal,
  rate?: Decimal | void,
  onChange: (arg: Currency) => void,
}

class ExchangeTo extends React.PureComponent<Props> {
  onCurrencySelect = (currencyTo: Currency) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(currencyTo);
    }
  };

  renderAmount() {
    const { amount, rate } = this.props;

    if (!isValidRate(rate) || !isValidAmount(amount)) {
      return (
        <div className={s.value}/>
      );
    }

    const value = amount.mul(rate).toFixed(2);
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

    const valueFrom = new Decimal(1);
    const valueTo = new Decimal(1).div(rate);

    return (
      <div className={s.rate}>
        <FormattedCurrency currency={currencyTo} value={valueFrom} precision={0} />
        {' = '}
        <FormattedCurrency currency={currencyFrom} value={valueTo} precision={2} />
      </div>
    );
  }

  render() {
    const { currencyTo, wallet } = this.props;
    const currencyList = Object.keys(wallet) as Array<Currency>;

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          selectedCurrency={currencyTo}
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
