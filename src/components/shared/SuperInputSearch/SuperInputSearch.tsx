import React, { FC } from 'react';

import search from '../../../assets/icons/search.png';
import { SuperInputText } from '../SuperInputText';

import s from './SuperInputSearch.module.css';

export const SuperInputSearch: FC = () => {
  /* const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeInputTitle(e.currentTarget.value));
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      dispatch(requestUser(userPage.title));
    }
  }; */

  return (
    <div className={s.searchBlock}>
      <img src={search} alt="search:" />
      <SuperInputText
        type="text"
        placeholder="Search..."
        /* onChange={changeTitle}
          value={userPage.title}
          onKeyPress={onKeyPressHandler} */
      />
    </div>
  );
};
