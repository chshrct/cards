import { useState } from 'react';

import { EMPTY_STRING } from 'constant';

export const useSuperInput = (
  validator: (text: string) => string,
): [
  string,
  (text: string) => void,
  string,
  (text: string) => void,
  boolean,
  (event: any) => void,
] => {
  const [value, setValue] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string>(EMPTY_STRING);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const onBlur = (): void => {
    setIsTouched(true);
    setError(validator(value));
  };

  const onChange = (text: string): void => {
    setValue(text);
    if (isTouched) setError(validator(text));
    if (!isTouched) {
      if (!validator(text)) setIsTouched(true);
    }
  };
  return [value, onChange, error, setError, isTouched, onBlur];
};
