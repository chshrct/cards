import React from 'react';

import { ONE } from '../../../constant';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchPacks, toggleId } from '../PacksListReducer';

import s from './ViewToggle.module.css';

type ButtonForToggleType = {
  title: string;
  changeIdHandle: () => void;
  className: string;
  disabled: boolean;
};

const ButtonForToggle: React.FC<ButtonForToggleType> = ({
  title,
  changeIdHandle,
  className,
  disabled,
}) => {
  const isLoading = useAppSelector(state => state.app.isLoading);

  return (
    <button
      disabled={disabled}
      onClick={!isLoading ? changeIdHandle : undefined}
      type="button"
      className={`${s.button} ${className} ${(disabled || isLoading) && s.disabled}`}
    >
      {title}
    </button>
  );
};

export const ViewToggle: React.FC = () => {
  const userId = useAppSelector(state => state.app.userId);
  const isToggleAllId = useAppSelector(state => state.packs.isToggleAllId);

  const dispatch = useAppDispatch();

  const setMyIdHandle = (): void => {
    dispatch(toggleId(false));
    dispatch(fetchPacks({ page: ONE, user_id: userId }));
  };
  const setAllIdHandle = (): void => {
    dispatch(toggleId(true));
    dispatch(fetchPacks({ page: ONE }));
  };
  const className1 = isToggleAllId ? s.lightFill : s.darkFill;
  const className2 = !isToggleAllId ? s.lightFill : s.darkFill;

  return (
    <div className={s.toggleContainer}>
      <ButtonForToggle
        className={className1}
        disabled={!isToggleAllId}
        changeIdHandle={setMyIdHandle}
        title="My"
      />
      <ButtonForToggle
        className={className2}
        disabled={isToggleAllId}
        changeIdHandle={setAllIdHandle}
        title="All"
      />
    </div>
  );
};
