import React from "react";
import UserCard from './UserCard/UserCard';
import SuperDoubleRange from '../../components/shared/SuperDoubleRange/SuperDoubleRange';
import s from './Profile.module.css'

const Profile: React.FC = () => {
  return (
  <div className={s.profileContainer}>
    <div className={s.sideBar}>
      <UserCard/>
      <div className={s.settingsBlock}>
      <h4 className={s.subtitle}>Number of cards</h4>
      <SuperDoubleRange/>
      </div>
    </div>
    <h2 className={s.title}>My packs list</h2>
  </div>
  );
};

export default Profile;
