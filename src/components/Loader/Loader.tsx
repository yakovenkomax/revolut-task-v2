import * as React from 'react';

import s from './Loader.module.css';

class Loader extends React.PureComponent {
  render() {
    return (
      <div className={s.root}>
        <div className={s.bounce1} />
        <div className={s.bounce2} />
        <div className={s.bounce3} />
      </div>
    );
  }
}

export default Loader;
