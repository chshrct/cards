import { FC } from 'react';

import { Link, useLocation } from 'react-router-dom';

import s from './UserCard.module.css';

import { AppRoutePaths } from 'routes';
import { useAppSelector } from 'store';

export const UserCard: FC = () => {
  const { name, avatar } = useAppSelector(state => state.auth.user);

  return (
    <div className={s.userContainer}>
      <img
        src={avatar ||
          'https://www.bookologymagazine.com/wp-content/uploads/2021/03/generic-user-image.svg'
        }
        alt=""
      />
      <h2>{name}</h2>
      <h3>Front-end developer</h3>
      <Link className={s.outlined} to={AppRoutePaths.EDIT_PROFILE}>
        Edit profile
      </Link>
    </div>
  );
};
