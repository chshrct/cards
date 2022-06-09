import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import s from './EditProfile.module.css';

import { editUserData } from 'App/auth/authReducer';
import { Avatar } from 'assets/icons/Avatar';
import { SuperButton, SuperInputText } from 'components';
import { BACK } from 'constant';
import { useInput, useUploadImage } from 'hooks';
import { useAppDispatch, useAppSelector } from 'store';
import { AppRoutePaths } from 'routes';

export const EditProfile: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { name, email, avatar } = useAppSelector(state => state.auth.user);
  const { image, onImageChange } = useUploadImage(avatar)

  const {
    value: nickName,
    handleInputValueChange: handleNickNameChange,
    error: errorNickName,
  } = useInput(name);

  const {
    handleInputValueChange: handleEmailChange,
    error: errorEmailName,
  } = useInput(email);

  const handleCancelEditing = (): void => navigate(BACK);

  const handleSaveData = (): void => {
    dispatch(editUserData({ name: nickName, avatar: image }));
    navigate(AppRoutePaths.PROFILE);
  };


  return (
    <div className={s.container}>
      <h2>Personal Information</h2>


      {image ? (
        <img src={image} className={s.avatar} alt="" />
      ) : (
        <Avatar className={s.avatar} />
      )}<input type="file" accept="image/*" name="image" id="file" onChange={onImageChange} />

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
