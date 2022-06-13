import React from 'react';

import { useAppSelector } from '../../../../store';

import s from './Header.module.css';
import { SortTitle } from './SortTitle/SortTitle';

export const Header: React.FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  return (
    <div className={s.head}>
      <SortTitle
        className={s.name}
        disabled={isAddNewPack}
        sortBy="name"
        title="Pack Name"
      />
      <SortTitle
        className={s.cardsCount}
        disabled={isAddNewPack}
        sortBy="cardsCount"
        title="Cards"
      />
      <SortTitle
        className={s.updated}
        disabled={isAddNewPack}
        sortBy="updated"
        title="Last Updated"
      />
      <SortTitle
        className={s.userName}
        disabled={isAddNewPack}
        sortBy="user_name"
        title="Created by"
      />
      <div className={s.buttonsBlock}>Actions</div>
    </div>
  );
};
