import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import CurrencyDisplay from '../CurrencyDisplay/CurrencyDisplay';

class CurrencySelector extends Component {
  onChange = ({ item: index }) => {
    const { onChange, currencyList } = this.props;

    if (onChange) {
      onChange(currencyList[index]);
    }
  };

  render() {
    const { currencyList, value, wallet } = this.props;
    const startIndex = currencyList.indexOf(value);

    return (
      <div className="CurrencySelector">
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
