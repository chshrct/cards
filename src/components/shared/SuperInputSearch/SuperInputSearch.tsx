import React, { ChangeEvent, FC } from 'react';

import search from '../../../assets/icons/search.png';
import { SuperInputText } from '../SuperInputText';

import s from './SuperInputSearch.module.css';

type SuperInputSearchType = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder?: string;
};

export const SuperInputSearch: FC<SuperInputSearchType> = ({
  onChange,
  value,
  placeholder,
  ...restProps
}) => {
  return (
    <div className={s.searchBlock}>
      <img src={search} alt="search:" />
      <SuperInputText
        type="text"
        placeholder={placeholder || 'Search...'}
        onChange={onChange}
        value={value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    </div>
  );
};
