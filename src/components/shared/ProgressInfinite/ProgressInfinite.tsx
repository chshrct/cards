import React, { FC } from 'react';

import s from './ProgressInfinite.module.css';

export const ProgressInfinite: FC = () => {
  return (
    <div className={s.progressBar}>
      <div className={s.progressBarValue} />
    </div>
  );
};
