/* eslint-disable no-underscore-dangle */

import React, { ChangeEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { CardPackType } from '../../../../api/packsApi';
import { SuperButton, SuperInputText } from '../../../../components';
import { ModalWindow } from '../../../../components/shared/ModalWindow/ModalWindow';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { deletePacks, updatePacks } from '../../PacksListReducer';

import s from './Row.module.css';

import { ZERO } from 'constant';
import { AppRoutePaths } from 'routes';

type RowType = {
  pack: CardPackType;
  className: string;
};

const SLICE_BEGIN_INDEX = 0;
const SLICE_END_INDEX = 10;

export const Row: React.FC<RowType> = ({ pack, className }) => {
  const isAddNewPack = useAppSelector(state => state.packs.isAddNewPack);
  const userId = useAppSelector(state => state.app.userId);
  const [isDeleteWindowOpened, setIsDeleteWindowOpened] = useState<boolean>(false);
  const [isEditWindowOpened, setIsEditWindowOpened] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [packName, setPackName] = useState(pack.name);
  const closeDeleteWindow = (): void => {
    setIsDeleteWindowOpened(false);
  };
  const deletePackHandle = (): void => {
    setIsDeleteWindowOpened(true);
  };
  const deletePack = (): void => {
    dispatch(deletePacks(pack._id));
  };
  const closeEditWindow = (): void => {
    setIsEditWindowOpened(false);
  };
  const editPackHandle = (): void => {
    setIsEditWindowOpened(true);
  };
  const updatePack = (): void => {
    dispatch(updatePacks(pack._id, packName));
  };
  const editPack = (e: ChangeEvent<HTMLInputElement>): void => {
    setPackName(e.currentTarget.value);
  };
  const onLearnPackClick = (): void =>
    navigate(`${AppRoutePaths.PACKS_LIST_LEARN}/${pack._id}`);

  return (
    <div className={`${s.body} ${className}`}>
      <Link to={pack._id} className={s.name}>
        {pack.name}
      </Link>
      <div className={s.cardsCount}>{pack.cardsCount}</div>
      <div className={s.updated}>
        {pack.updated.slice(SLICE_BEGIN_INDEX, SLICE_END_INDEX)}
      </div>
      <div className={s.userName}>{pack.user_name}</div>
      <div className={s.buttonsBlock}>
        {pack.cardsCount > ZERO && (
          <SuperButton
            size="small"
            shape="square"
            color="secondary"
            onClick={onLearnPackClick}
          >
            Learn
          </SuperButton>
        )}
        {pack.user_id === userId ? (
          <>
            <SuperButton
              color="alerty"
              shape="square"
              onClick={deletePackHandle}
              disabled={isAddNewPack}
            >
              Delete
            </SuperButton>
            <ModalWindow
              closeWindow={closeDeleteWindow}
              isOpened={isDeleteWindowOpened}
              actionTitle="Delete Pack"
              onClick={deletePack}
              submitButtonName="Delete"
              disabled={isAddNewPack}
              buttonColor="alerty"
            >
              <span className={s.deletePackText}>
                Do you really want to remove
                <span className={s.packName}>
                  {' '}
                  Pack name - &quot;{pack.name}&quot;?{' '}
                </span>{' '}
                All cards will be excluded from this course.
              </span>
            </ModalWindow>
            <SuperButton
              color="secondary"
              shape="square"
              onClick={editPackHandle}
              disabled={isAddNewPack}
            >
              Edit
            </SuperButton>
            <ModalWindow
              closeWindow={closeEditWindow}
              isOpened={isEditWindowOpened}
              actionTitle="Edit Pack"
              onClick={updatePack}
              submitButtonName="Save"
              disabled={isAddNewPack}
            >
              <div className={s.titlePack}>
                <SuperInputText label="Name pack" onChange={editPack} value={packName} />
              </div>
            </ModalWindow>
          </>
        ) : null}
      </div>
    </div>
  );
};
