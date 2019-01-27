import React from 'react';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import CurrencyDisplay from '../CurrencyDisplay/CurrencyDisplay';

import s from './CurrencySelector.module.css';

interface Props {
  wallet: CurrencyMap,
  currencyList: Array<Currency>,
  selectedCurrency: Currency,
  onChange: (arg: Currency) => void,
}

class CurrencySelector extends React.PureComponent<Props> {
  onChange = ({ item: index }: { item: number }) => {
    const { onChange, currencyList } = this.props;

    if (onChange) {
      onChange(currencyList[index]);
    }
  };

  render() {
    const { currencyList, selectedCurrency, wallet } = this.props;
    const startIndex = currencyList.indexOf(selectedCurrency);

    return (
      <div className={s.root}>
        <AliceCarousel
          infinite
          buttonsDisabled
          mouseDragEnabled
          keysControlDisabled
          startIndex={startIndex}
          responsive={ {0: { items: 1 }} }
          onSlideChanged={this.onChange}
        >
          { currencyList.map((currency) =>
            <CurrencyDisplay key={currency} currency={currency} value={wallet[currency]}/>
          )}
        </AliceCarousel>
      </div>
    );
  }
}

export default CurrencySelector;
