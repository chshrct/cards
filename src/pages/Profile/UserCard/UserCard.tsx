import {Link} from 'react-router-dom';
import s from './UserCard.module.css';
import {RoutePaths } from '../../../constants/routePaths'


const UserCard:React.FC = () => {
   return (
    <div className={s.userContainer}>
      <img src={'https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'} alt=''/>
      <h2>User's name</h2>
      <h3>Role</h3>
      <Link className={s.outlined} to={RoutePaths.editProfile}>Edit profile</Link>
    </div>
  );
};

export default UserCard;
