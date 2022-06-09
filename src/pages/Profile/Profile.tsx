import { FC } from 'react';

import s from './Profile.module.css';
import { UserCard } from './UserCard';

import { MultiRangeSlider } from 'components/shared/MultiRangeSlider/MultiRangeSlider';

export const Profile: FC = () => {
  return (
    <div className={s.profileContainer}>
      <div className={s.sideBar}>
        <UserCard />
        <div className={s.settingsBlock}>
          <h4 className={s.subtitle}>Number of cards</h4>
          <MultiRangeSlider
            min={0}
            max={150}
            // @ts-ignore
            onChange={({ min, max }) => {
              console.log('MIN', min, 'MAX', max);
            }}
          />
        </div>
      </div>
      <h2 className={s.title}>My packs list</h2>
    </div>
  );
};
