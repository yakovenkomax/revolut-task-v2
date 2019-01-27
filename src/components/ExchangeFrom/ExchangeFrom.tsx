import React, { ChangeEvent, RefObject } from 'react';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import ContentEditable from 'react-contenteditable';

import s from './ExchangeFrom.module.css';

import { Decimal } from 'decimal.js';

const MAX_LENGTH = 6;

interface Props {
  wallet: CurrencyMap,
  amount: Decimal,
  currencyFrom: Currency,
  onInput: (arg: Decimal) => void,
  onChange: (arg: Currency) => void,
}

interface State {
  amount: string,
}

class ExchangeFrom extends React.PureComponent<Props, State> {
  state = { amount: '' };
  contentEditable: RefObject<HTMLElement> = React.createRef();

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);

    this.focusInput();
  }

  handleCurrencySelect = (currencyFrom: Currency) => {
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

    if (!(input instanceof HTMLElement) || input === document.activeElement) {
      return;
    }

    this.moveCaretToEnd(input);
  }

  moveCaretToEnd(el: HTMLElement) {
    el.focus();
    if (typeof window.getSelection !== 'undefined' && typeof document.createRange !== 'undefined') {
      const range = document.createRange();

      range.selectNodeContents(el);
      range.collapse(false);

      const selection = window.getSelection();

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  onAmountInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { onInput } = this.props;
    const amount = event.target.value;
    const isValid = /^[0-9.\s]*$/.test(amount);

    if (isValid && amount.length <= MAX_LENGTH) {
      const parsedAmount = new Decimal(amount);
      this.setState({ amount });

      if (parsedAmount && onInput) {
        onInput(parsedAmount);
      }

      if (amount === '' && onInput) {
        onInput(new Decimal(0));
      }
    } else {
      this.forceUpdate();
    }
  };

  render() {
    const { amount } = this.state;
    const { currencyFrom, wallet } = this.props;
    const currencyList = Object.keys(wallet) as Array<Currency>;

    return (
      <div className={s.root}>
        <CurrencySelector
          wallet={wallet}
          currencyList={currencyList}
          selectedCurrency={currencyFrom}
          onChange={this.handleCurrencySelect}
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
