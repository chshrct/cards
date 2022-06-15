import React, { FC, ReactNode } from 'react';

import s from './ModalWindow.module.css';

import { SuperButton } from 'components';
import { Popup } from 'components/Portal/Popup/Popup';

type PropsType = {
  closeWindow: () => void;
  isOpened: boolean;
  actionTitle: string;
  onClick: () => void;
  submitButtonName: string;
  children: ReactNode;
  disabled?: boolean;
  buttonColor?: 'primary' | 'secondary' | 'alerty';
};
export const ModalWindow: FC<PropsType> = ({
  closeWindow,
  isOpened,
  actionTitle,
  onClick,
  submitButtonName,
  children,
  disabled,
  buttonColor = 'primary',
}) => {
  const onClickHandler = (): void => {
    onClick();
    closeWindow();
  };
  return (
    <Popup isOpened={isOpened} onClose={closeWindow}>
      <div className={s.modalWindow}>
        <div className={s.modalWidowHeader}>
          <span className={s.actionTitle}>{actionTitle}</span>
        </div>
        {children}
        <div className={s.modalWindowButtons}>
          <SuperButton onClick={closeWindow} color="secondary" size="small">
            Cancel
          </SuperButton>
          <SuperButton
            onClick={onClickHandler}
            disabled={disabled}
            size="small"
            color={buttonColor}
          >
            {submitButtonName}
          </SuperButton>
        </div>
      </div>
    </Popup>
  );
};
