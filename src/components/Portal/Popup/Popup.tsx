import { FC, ReactNode, useId } from 'react';

import Portal from '../Portal';

import s from './Popup.module.css';

type PropsType = {
  children?: ReactNode;
  isOpened: boolean;
  onClose: () => void;
};

export const Popup: FC<PropsType> = ({ children, isOpened = false, onClose }) => {
  const id = useId();

  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={s.container} role="dialog">
        <label htmlFor={id}>
          {' '}
          <div
            aria-hidden="true"
            id={id}
            className={s.overlay}
            role="button"
            tabIndex={0}
            onClick={onClose}
          />
        </label>
        <div className={s.content}>{children}</div>
      </div>
    </Portal>
  );
};
