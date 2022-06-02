import { FC } from 'react';

import s from './EditProfile.module.css';

import { Avatar } from 'assets/icons/Avatar';
import { SuperButton, SuperInputText } from 'components';
import { useInput } from 'hooks';
import { useAppSelector } from 'store';

export const EditProfile: FC = () => {
  const user = useAppSelector(state => state.login.user);

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
        <SuperButton className={s.secondary}>Cancel</SuperButton>
        <SuperButton className={s.primary}>Save</SuperButton>
      </div>
    </div>
  );
};
