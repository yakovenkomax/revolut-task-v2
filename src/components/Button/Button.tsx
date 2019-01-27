import React, { SyntheticEvent } from 'react';
import classNames from 'classnames';

import s from './Button.module.css';

interface Props {
  type: string,
  text: string,
  disabled: boolean,
}

class Button extends React.PureComponent<Props> {
  render() {
    const { type, disabled, text } = this.props;
    const buttonClassName = classNames(s.root, { [s.disabled]: disabled });

    return (
      <button
        className={buttonClassName}
        type={type}
        disabled={disabled}
      >
        { text }
      </button>
    );
  }
}

export default Button;
