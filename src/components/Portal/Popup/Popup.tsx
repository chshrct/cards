/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, ReactNode } from 'react';

import Portal from '../Portal';

import s from './Popup.module.css';

type PropsType = {
  children?: ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export const Popup: FC<PropsType> = ({ children, isOpened = false, onClose }) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={s.container} role="dialog">
        <div className={s.overlay} role="button" tabIndex={0} onClick={onClose} />
        <div className={s.content}>{children}</div>
      </div>
    </Portal>
  );
};
