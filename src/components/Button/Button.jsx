import React from 'react';
import classNames from 'classnames';

import s from './Button.module.css';

class Button extends React.PureComponent {
  render() {
    const { type, disabled, onClick, text } = this.props;
    const buttonClassName = classNames(s.root, { [s.disabled]: disabled });

    return (
      <button
        className={buttonClassName}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        { text }
      </button>
    );
  }
}

export default Button;
