import { useState } from 'react';

import { EMPTY_STRING, ERROR_INPUT_MESSAGE } from '../../constants';

import { UseInputReturnType } from './types';

export const useInput = (initialValue: string = EMPTY_STRING): UseInputReturnType => {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string>(EMPTY_STRING);

  const handleInputValueChange = (newValue: string): void => {
    if (!newValue.trim()) {
      setError(ERROR_INPUT_MESSAGE);
    }
    if (error) {
      setError(EMPTY_STRING);
    }
    setValue(newValue);
  };

  return { value, handleInputValueChange, error };
};
