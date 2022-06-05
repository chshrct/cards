import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import s from './Nav.module.css';

import { ReactComponent as CardsIcon } from 'assets/icons/cards.svg';
import { ReactComponent as PersonIcon } from 'assets/icons/person.svg';
import { AppRoutePaths } from 'routes';

export const Nav: FC = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.Link} ${s.activeLink}` : `${s.Link}`
        }
        to={AppRoutePaths.PACKS_LIST}
      >
        <CardsIcon />
        <span>Packs list</span>
      </NavLink>
      <NavLink
        to={AppRoutePaths.PROFILE}
        className={({ isActive }) =>
          isActive ? `${s.Link} ${s.activeLink}` : `${s.Link}`
        }
      >
        <PersonIcon />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
};
