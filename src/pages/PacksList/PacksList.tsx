import React, { FC, useEffect } from 'react';

import { SuperButton } from '../../components';
import { useAppDispatch, useAppSelector } from '../../store';

import { addNewPack, deletePacks, fetchPacks, updatePacks } from './PacksListReducer';

export const PacksList: FC = () => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const dispatch = useAppDispatch();

  const addNewPackHandle = (): void => dispatch(addNewPack());
  const deletePackHandle = (): void => dispatch(deletePacks('629ce515e851350004005e3e'));
  const editPackHandle = (): void =>
    dispatch(updatePacks('629ce515e851350004005e3e', 'NEW PACK NAME'));

  useEffect(() => {
    dispatch(fetchPacks());
  }, []);
  return (
    <div>
      PacksList
      <SuperButton onClick={addNewPackHandle} disabled={isAddNewPack}>
        Add new pack
      </SuperButton>
      <SuperButton onClick={deletePackHandle} disabled={isAddNewPack}>
        Delete
      </SuperButton>
      <SuperButton onClick={editPackHandle} disabled={isAddNewPack}>
        Edit
      </SuperButton>
    </div>
  );
};
