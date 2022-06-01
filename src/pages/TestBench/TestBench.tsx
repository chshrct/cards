import { FC } from 'react';

import { useSelector } from 'react-redux';

import {
  SuperButton,
  SuperCheckbox,
  SuperEditableSpan,
  SuperInputText,
  SuperRadio,
  SuperRange,
  SuperSelect,
} from 'components';
import { AppRootStateType } from 'store';

export const TestBench: FC = () => {
  const count = useSelector<AppRootStateType>(state => state.profile.count);

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
          <button type="button" onClick={() => {}}>
            inc
          </button>
        </div>
      </div>
    </div>
  );
};
