/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, ReactNode, useState } from 'react';

import Portal from '../Portal';

import s from './Popup.module.css';

type PropsToSendType = {
  closePopup: () => void;
};

type PropsType = {
  children?: ((arg: PropsToSendType) => ReactNode) | ReactNode;
  isOpened?: boolean;
};

export const Popup: FC<PropsType> = ({ children, isOpened = true }) => {
  const [isPopupOpened, setIsPopupOpened] = useState<boolean>(isOpened);
  const closePopup = (): void => {
    setIsPopupOpened(false);
  };
  if (!isPopupOpened) {
    return null;
  }

  const propsToSend: PropsToSendType = { closePopup };

  return (
    <Portal>
      <div className={s.container} role="dialog">
        <div
          className={s.overlay}
          role="button"
          tabIndex={0}
          onClick={() => setIsPopupOpened(false)}
        />
        <div className={s.content}>
          {typeof children === 'function' ? children(propsToSend) : children}
        </div>
      </div>
    </Portal>
  );
};
