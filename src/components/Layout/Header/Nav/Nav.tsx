import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ReactComponent as CardsIcon } from '../../../../assets/icons/cards.svg';
import { ReactComponent as PersonIcon } from '../../../../assets/icons/person.svg';

import s from './Nav.module.css';

import { AppRoutePaths } from 'routes';

export const Nav: FC = () => {
  return (
    <nav className={s.nav}>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${s.Link} ${s.activeLink}` : `${s.Link}`
        }
        to={AppRoutePaths.PROFILE}
      >
        <CardsIcon />
        <span>Packs list</span>
      </NavLink>
      <NavLink
        to={AppRoutePaths.PACKS_LIST}
        className={({ isActive }) =>
          isActive ? `${s.Link} ${s.activeLink}` : `${s.Link}`
        }
      >
        <PersonIcon />
        <span>Packs list</span>
      </NavLink>
    </nav>
  );
};
