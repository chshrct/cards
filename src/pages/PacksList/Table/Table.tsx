import React from 'react';

import { useAppSelector } from '../../../store';

import { Row } from './Row/Row';
import s from './Table.module.css';

const DIVISOR_EQUAL_TWO = 2;
const REMAINDER_EQUAL_ZERO = 0;

export const Table: React.FC = () => {
  const packs = useAppSelector(state => state.packs.packs.cardPacks);

  if (packs === undefined)
    return <span>This pack is empty. Click add new card to fill this pack</span>;
  return (
    <div className={s.tableContainer}>
      <div className={s.head}>
        <div className={s.name}>Pack Name</div>
        <div className={s.cardsCount}>Cards</div>
        <div className={s.updated}>Last Updated</div>
        <div className={s.userName}>Created by</div>
        <div className={s.buttonsBlock}>Actions</div>
      </div>
      {packs.map((p, i) => {
        return (
          <Row
            key={p.user_id}
            pack={p}
            className={
              i % DIVISOR_EQUAL_TWO === REMAINDER_EQUAL_ZERO
                ? s.lightBackground
                : s.darkBackground
            }
          />
        );
      })}
    </div>
  );
};
