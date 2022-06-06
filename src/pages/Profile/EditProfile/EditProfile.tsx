import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './EditProfile.module.css';

import { editUserData } from 'App/auth/authReducer';
import { Avatar } from 'assets/icons/Avatar';
import { SuperButton, SuperInputText } from 'components';
import { BACK } from 'constant';
import { useInput } from 'hooks';
import { useAppDispatch, useAppSelector } from 'store';

export const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth.user);

  const {
    value: nickName,
    handleInputValueChange: handleNickNameChange,
    error: errorNickName,
  } = useInput(user?.name);
  const {
    value: email,
    handleInputValueChange: handleEmailChange,
    error: errorEmailName,
  } = useInput(user?.email);

  const handleCancelEditing = (): void => navigate(BACK);

  const handleSaveData = (): void => {
    dispatch(editUserData({ ...user, name: nickName }));
    navigate(BACK);
  };

  return (
    <div className={s.container}>
      <h2>Personal Information</h2>

      {user?.avatar ? (
        <img src={user?.avatar} className={s.avatar} alt="" />
      ) : (
        <Avatar className={s.avatar} />
      )}

      <div className={s.inputWrapper}>
        <SuperInputText
          value={nickName}
          onChangeText={handleNickNameChange}
          error={errorNickName}
          label="Nickname"
          id="nickName"
        />

        <SuperInputText
          value={email}
          onChangeText={handleEmailChange}
          error={errorEmailName}
          label="Email"
          id="email"
          disabled
        />
      </div>
      <div className={s.buttonsWrapper}>
        <SuperButton className={s.secondary} onClick={handleCancelEditing}>
          Cancel
        </SuperButton>
        <SuperButton className={s.primary} onClick={handleSaveData}>
          Save
        </SuperButton>
      </div>
    </div>
  );
};
