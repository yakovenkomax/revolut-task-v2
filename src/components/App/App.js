import React, { Component } from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';
import ExchangeRate from '../ExchangeRate/ExchangeRate';
import ExchangeButton from '../ExchangeButton/ExchangeButton';
import ExchangeFrom from '../ExchangeFrom/ExchangeFrom';
import ExchangeTo from '../ExchangeTo/ExchangeTo';

import ratesActions from '../../actions/rates';

import './App.css';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(ratesActions.update());
  }

  updateRates = (ratesObject) => {
    let { rates } = this.state;

    rates[ratesObject.base] = ratesObject.rates;
    this.setState({ rates },
      this.updateAmountTo);

    console.log('Rates update:', rates);
  };

  // amountToNumber(amount) {
  //   return amount / 10000;
  // }

  // amountToString(amount) {
  //   return (amount / 10000).toFixed(2).replace('.00', '');
  // }

  // valueToAmount(value) {
  //   return value === '' ? '': parseInt(parseFloat(value.toString().replace(',', '.')) * 10000, 10);
  // }

  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="header__left">
          </div>
          <div className="header__center">
            <ExchangeRate />
          </div>
          <div className="header__right">
            <ExchangeButton />
          </div>
        </header>
        <main className="main">
          <div className="exchange">
            <ExchangeFrom />
          </div>
          <div className="exchange">
            <ExchangeTo />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
}

export default connect (mapStateToProps)(App);
