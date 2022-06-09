import { FC } from 'react';

import s from './Profile.module.css';
import { UserCard } from './UserCard';

import { SuperRange } from 'components';

export const Profile: FC = () => {
  return (
    <div className={s.profileContainer}>
      <div className={s.sideBar}>
        <UserCard />
        <div className={s.settingsBlock}>
          <h4 className={s.subtitle}>Number of cards</h4>
          <SuperRange />
        </div>
      </div>
      <h2 className={s.title}>My packs list</h2>
    </div>
  );
};
