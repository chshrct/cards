import { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import s from './SuperRadio.module.css';

import { EMPTY_STRING } from 'constant';

type DefaultRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperRadioPropsType = DefaultRadioPropsType & {
  options?: any[];
  onChangeOption?: (option: any) => void;
};
// @ts-ignore
export const SuperRadio: FC<SuperRadioPropsType> = ({
  name,
  options,
  value,
  onChange,
  onChangeOption,
  className,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);
    onChangeOption?.(e.currentTarget.value);
  };

  const radioClassName = `${s.radio} ${className || EMPTY_STRING}`;

  const mappedOptions: any[] = options
    ? options.map(o => {
        const key = Math.random();
        const id = Math.random().toString();

        return (
          <label htmlFor={id} key={key} className={s.label}>
            <input
              id={id}
              type="radio"
              name={name}
              onChange={onChangeCallback}
              value={o}
              checked={value === o}
              className={radioClassName}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...restProps}
            />
            {o}
          </label>
        );
      })
    : [];

  return mappedOptions;
};
