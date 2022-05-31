import React, {
  SelectHTMLAttributes,
  DetailedHTMLProps,
  ChangeEvent,
  useId,
  FC,
} from 'react';

import s from './SuperSelect.module.css';

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
  const selectClassName = `${s.select} ${className || ''}`;

  const mappedOptions: any[] = options
    ? options.map(o => {
        const key = useId();
        return (
          <option key={key} value={o}>
            {o}
          </option>
        );
      })
    : [];

  const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>): void => {
    onChange?.(e);
    onChangeOption?.(e.currentTarget.value);
    e.currentTarget.blur();
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={selectClassName} onChange={onChangeCallback} {...restProps}>
      {mappedOptions}
    </select>
  );
};

export default SuperSelect;
