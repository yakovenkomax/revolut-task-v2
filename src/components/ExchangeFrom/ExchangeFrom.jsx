import React, { Component } from 'react';
import { connect } from 'react-redux';
import exchangeActions from '../../actions/exchange';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import ContentEditable from 'react-contenteditable';

import s from './ExchangeFrom.module.css';

const MAX_LENGTH = 6;

class ExchangeFrom extends Component {
  state = { amount: '' };
  contentEditable = React.createRef();

  componentDidMount() {
    const { dispatch, currencyList } = this.props;
    document.addEventListener("keydown", this.handleKeyDown);

    this.contentEditable.current.focus();

    dispatch(exchangeActions.updateExchangeSettings({ currencyFrom: currencyList[0] }));
  }

  onCurrencySelect = (currencyFrom) => {
    const { dispatch } = this.props;

    this.contentEditable.current.focus();

    dispatch(exchangeActions.updateExchangeSettings({ currencyFrom }));
  };

  handleKeyDown = () => {
    this.contentEditable.current.focus();
  };

  onAmountInput = (event) => {
    const { dispatch } = this.props;
    const amount = event.target.value;
    const parsedAmount = parseFloat(amount);
    const isValid = /^[0-9.\s]*$/.test(amount);

    if (isValid && amount.length <= MAX_LENGTH) {
      this.setState({ amount });
    } else {
      this.forceUpdate();
    }

    if (parsedAmount) {
      dispatch(exchangeActions.updateExchangeSettings({ amount: parsedAmount }));
    }

    if (amount === '') {
      dispatch(exchangeActions.updateExchangeSettings({ amount: 0 }));
    }
  };

  render() {
    const { amount } = this.state;
    const { currencyList, currencyFrom, wallet } = this.props;

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          value={currencyFrom}
          currencyList={currencyList}
          onChange={this.onCurrencySelect}
        />
        <ContentEditable
          className={s.amountInput}
          html={amount}
          innerRef={this.contentEditable}
          onChange={this.onAmountInput}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { exchange, wallet } = state;
  const { currencyFrom, amount } = exchange;
  const currencyList = Object.keys(wallet);

  return {
    currencyList,
    currencyFrom,
    wallet,
    amount,
  };
};

export default connect(mapStateToProps)(ExchangeFrom);
