import React, { FC } from 'react';

import { useSelector } from 'react-redux';

import SuperButton from 'components/shared/SuperButton/SuperButton';
import SuperCheckbox from 'components/shared/SuperCheckbox/SuperCheckbox';
import SuperEditableSpan from 'components/shared/SuperEditableSpan/SuperEditableSpan';
import SuperInputText from 'components/shared/SuperInputText/SuperInputText';
import SuperRadio from 'components/shared/SuperRadio/SuperRadio';
import SuperRange from 'components/shared/SuperRange/SuperRange';
import SuperSelect from 'components/shared/SuperSelect/SuperSelect';
import { setEmailTestThunk } from 'pages/Login/loginReducer';
import { AppRootStateType, useAppDispatch } from 'store/store';

const TestBench: FC = () => {
  const count = useSelector<AppRootStateType>(state => state.profile.count);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h2>TestBench</h2>
      <div>
        <SuperButton>Button</SuperButton>
      </div>
      <hr />
      <div>
        <SuperCheckbox>Checkbox</SuperCheckbox>
      </div>
      <hr />
      <div>
        <SuperEditableSpan value="Editable span" />
      </div>
      <hr />
      <div>
        <SuperInputText placeholder="enter some text" />
      </div>
      <hr />
      <div>
        <SuperRadio name="radio" options={['first', 'second', 'third']} />
      </div>
      <hr />
      <div>
        <SuperRange />
      </div>
      <hr />
      <div>
        <SuperSelect options={['first', 'second', 'third']} />
      </div>
      <hr />
      <div>
        <h4>Check redux</h4>
        <div>
          <h3>count</h3>
          <div>{`${count}`}</div>
          <button type="button" onClick={() => dispatch(setEmailTestThunk())}>
            inc
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestBench;
