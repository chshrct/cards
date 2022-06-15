import React from 'react';

import { TWO, ZERO } from '../../../constant';
import { useAppSelector } from '../../../store';

import { Header } from './Header/Header';
import { Row } from './Row/Row';
import s from './Table.module.css';

export const Table: React.FC = () => {
  const packs = useAppSelector(state => state.packs.packs.cardPacks);
  return (
    <div className={s.tableBlock}>
      <Header />
      {packs.map((p, i) => {
        return (
          <Row
            // eslint-disable-next-line no-underscore-dangle
            key={p._id}
            pack={p}
            className={i % TWO === ZERO ? s.lightBackground : s.darkBackground}
          />
        );
      })}
    </div>
  );
};
