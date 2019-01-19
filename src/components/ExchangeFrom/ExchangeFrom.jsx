import React from 'react';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import ContentEditable from 'react-contenteditable';

import s from './ExchangeFrom.module.css';

const MAX_LENGTH = 6;

class ExchangeFrom extends React.PureComponent {
  state = { amount: '' };
  contentEditable = React.createRef();

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);

    this.contentEditable.current.focus();
  }

  onCurrencySelect = (currencyFrom) => {
    const { onChange } = this.props;

    this.contentEditable.current.focus();

    if (onChange) {
      onChange(currencyFrom);
    }
  };

  handleKeyDown = () => {
    this.contentEditable.current.focus();
  };

  onAmountInput = (event) => {
    const { onInput } = this.props;
    const amount = event.target.value;
    const parsedAmount = parseFloat(amount);
    const isValid = /^[0-9.\s]*$/.test(amount);

    if (isValid && amount.length <= MAX_LENGTH) {
      this.setState({ amount });
    } else {
      this.forceUpdate();
    }

    if (parsedAmount && onInput) {
      onInput(parsedAmount);
    }

    if (amount === '' && onInput) {
      onInput(0);
    }
  };

  render() {
    const { amount } = this.state;
    const { currencyFrom, wallet } = this.props;
    const currencyList = Object.keys(wallet);

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

export default ExchangeFrom;
