import { FC } from 'react';

import { Link } from 'react-router-dom';

import { RoutePaths } from '../../../constants/routePaths';

import s from './UserCard.module.css';

export const UserCard: FC = () => {
  return (
    <div className={s.userContainer}>
      <img
        src="https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc"
        alt=""
      />
      <h2>User&apos;s name</h2>
      <h3>Role</h3>
      <Link className={s.outlined} to={RoutePaths.editProfile}>
        Edit profile
      </Link>
    </div>
  );
};
