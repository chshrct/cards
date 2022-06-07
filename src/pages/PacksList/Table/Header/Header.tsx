import React from 'react';

import s from './Header.module.css';
import { SortTitle } from './SortTitle/SortTitle';

export const Header: React.FC = () => {
  return (
    <div className={s.head}>
      <div className={s.name}>Pack Name</div>
      <SortTitle className={s.cardsCount} sortBy="cardsCount" title="Cards" />
      <SortTitle className={s.updated} sortBy="updated" title="Last Updated" />
      <div className={s.userName}>Created by</div>
      <div className={s.buttonsBlock}>Actions</div>
    </div>
  );
};
