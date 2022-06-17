import { ChangeEvent, DetailedHTMLProps, FC, SelectHTMLAttributes } from 'react';

import { useAppSelector } from '../../../store';

import s from './SuperSelect.module.css';

import { EMPTY_STRING } from 'constant';

type DefaultSelectPropsType = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

type SuperSelectPropsType = DefaultSelectPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};

export const SuperSelect: FC<SuperSelectPropsType> = ({
  options,
  onChange,
  onChangeOption,
  className,
  ...restProps
}) => {
  const selectClassName = `${s.select} ${className || EMPTY_STRING}`;
  const isLoading = useAppSelector(state => state.app.isLoading);

  const mappedOptions: any[] = options
    ? options.map(o => {
        const key = Math.random();

        return (
          <option key={key} value={o}>
            {o}
          </option>
        );
      })
    : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    if (!isLoading) {
      onChange?.(e);
      onChangeOption?.(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={selectClassName} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  );
};

export default SuperSelect;
