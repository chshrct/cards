import { useState } from 'react';

import { EMPTY_STRING } from 'constant';

export const useSuperInput = (
  validator: (text: string) => string,
): [string, (text: string) => void, string, (text: string) => void] => {
  const [value, setValue] = useState<string>(EMPTY_STRING);
  const [error, setError] = useState<string>(EMPTY_STRING);

  const onChange = (text: string): void => {
    setValue(text);
    setError(validator(text));
  };
  return [value, onChange, error, setError];
};
