import React, { FC, useEffect } from 'react';

import { SuperButton } from '../../components';
import { useAppDispatch } from '../../store';

import { addNewPack, fetchPacks } from './PacksListReducer';

export const PacksList: FC = () => {
  const dispatch = useAppDispatch();
  const addNewPackHandle = (): void => {
    dispatch(addNewPack());
  };

  useEffect(() => {
    dispatch(fetchPacks());
  }, []);
  return (
    <div>
      PacksList
      <SuperButton onClick={addNewPackHandle}>Add new pack</SuperButton>
    </div>
  );
};
