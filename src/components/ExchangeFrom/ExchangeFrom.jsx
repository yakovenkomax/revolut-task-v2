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

    this.focusInput();
  }

  onCurrencySelect = (currencyFrom) => {
    const { onChange } = this.props;

    this.focusInput();

    if (onChange) {
      onChange(currencyFrom);
    }
  };

  handleKeyDown = () => {
    this.focusInput();
  };

  focusInput() {
    const input = this.contentEditable.current;

    if (input === document.activeElement) {
      return;
    }

    this.moveCaretToEnd(input);
  }

  moveCaretToEnd(el) {
    el.focus();
    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      const range = document.createRange();

      range.selectNodeContents(el);
      range.collapse(false);

      const selection = window.getSelection();

      selection.removeAllRanges();
      selection.addRange(range);
    } else if (typeof document.body.createTextRange !== 'undefined') {
      const textRange = document.body.createTextRange();

      textRange.moveToElementText(el);
      textRange.collapse(false);
      textRange.select();
    }
  }

  onAmountInput = (event) => {
    const { onInput } = this.props;
    const amount = event.target.value;
    const parsedAmount = parseFloat(amount);
    const isValid = /^[0-9.\s]*$/.test(amount);

    if (isValid && amount.length <= MAX_LENGTH) {
      this.setState({ amount });

      if (parsedAmount && onInput) {
        onInput(parsedAmount);
      }

      if (amount === '' && onInput) {
        onInput(0);
      }
    } else {
      this.forceUpdate();
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
