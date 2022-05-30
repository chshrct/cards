import React from 'react';
import s from './EditProfile.module.css';
import { useInput } from '../../../hooks/useInput/useInput'
import SuperInputText from '../../../components/shared/SuperInputText/SuperInputText'

const EditProfile: React.FC = () => {
  const {value: nickName, handleInputValueChange: handleNickNameChange, error: errorNickName} = useInput();
  const {value: email, handleInputValueChange: handleEmailChange, error: errorEmailName} = useInput();

  return (
  <div className={s.container}>
    <h2>Personal Information</h2>
    <img src={'https://play-lh.googleusercontent.com/CWzqShf8hi-AhV9dUjzsqk2URzdIv8Vk2LmxBzf-Hc8T-oGkLVXe6pMpcXv36ofpvtc'} alt={''}/>
        <SuperInputText
                    value={nickName}
                    onChangeText={handleNickNameChange}
                    error={errorNickName}
                />    

      <SuperInputText
                    value={email}
                    onChangeText={handleEmailChange}
                    error={errorEmailName}
                />   
  </div>
  );
};

export default EditProfile;
