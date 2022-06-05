import { FC } from 'react';

import { Navigate } from 'react-router-dom';

import s from './Profile.module.css';
import { UserCard } from './UserCard';

import { SuperRange } from 'components';
import { AppRoutePaths } from 'routes';
import { useAppSelector } from 'store';

export const Profile: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth);
  if (!isAuth) return <Navigate to={AppRoutePaths.LOGIN} />;
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
