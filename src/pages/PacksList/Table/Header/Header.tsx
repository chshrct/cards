import React from 'react';

import { useAppSelector } from '../../../../store';

import s from './Header.module.css';
import { SortTitle } from './SortTitle/SortTitle';

export const Header: React.FC = () => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  return (
    <div className={s.head}>
      <SortTitle
        className={s.name}
        disabled={isLoading}
        sortBy="name"
        title="Pack Name"
      />
      <SortTitle
        className={s.cardsCount}
        disabled={isLoading}
        sortBy="cardsCount"
        title="Cards"
      />
      <SortTitle
        className={s.updated}
        disabled={isLoading}
        sortBy="updated"
        title="Last Updated"
      />
      <SortTitle
        className={s.userName}
        disabled={isLoading}
        sortBy="user_name"
        title="Created by"
      />
      <div className={s.buttonsBlock}>Actions</div>
    </div>
  );
};
