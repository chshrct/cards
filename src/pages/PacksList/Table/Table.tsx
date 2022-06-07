import React from 'react';

import { useAppSelector } from '../../../store';

import { Header } from './Header/Header';
import { Row } from './Row/Row';
import s from './Table.module.css';

const DIVISOR_EQUAL_TWO = 2;
const REMAINDER_EQUAL_ZERO = 0;

export const Table: React.FC = () => {
  const packs = useAppSelector(state => state.packs.packs.cardPacks);
  return (
    <div className={s.tableContainer}>
      <Header />
      {packs.map((p, i) => {
        return (
          <Row
            // eslint-disable-next-line no-underscore-dangle
            key={p._id}
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
