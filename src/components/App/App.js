import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExchangeRate from '../ExchangeRate/ExchangeRate';
import ExchangeButton from '../ExchangeButton/ExchangeButton';
import ExchangeFrom from '../ExchangeFrom/ExchangeFrom';
import ExchangeTo from '../ExchangeTo/ExchangeTo';

import ratesActions from '../../actions/rates';

import s from './App.module.css';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(ratesActions.update());
  }

  render() {
    return (
      <div className={s.root}>
        <header className={s.header}>
          <div className={s.headerLeft}>
          </div>
          <div className={s.headerCenter}>
            <ExchangeRate />
          </div>
          <div className={s.headerRight}>
            <ExchangeButton />
          </div>
        </header>
        <main className={s.main}>
          <div className={s.exchange}>
            <ExchangeFrom />
          </div>
          <div className={s.exchange}>
            <ExchangeTo />
          </div>
        </main>
      </div>
    );
  }
}

export default connect()(App);
