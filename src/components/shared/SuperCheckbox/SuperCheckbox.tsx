import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useId,
} from 'react';

import s from './SuperCheckbox.module.css';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperCheckboxPropsType = DefaultInputPropsType & {
  onChangeChecked?: (checked: boolean) => void;
  spanClassName?: string;
};

const SuperCheckbox: FC<SuperCheckboxPropsType> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  onChange,
  onChangeChecked,
  className,
  children,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    const slowBlur = 3000;
    onChangeChecked?.(e.currentTarget.checked);
    onChange?.(e);
    const checkbox = e.currentTarget;
    setTimeout(() => {
      checkbox.blur();
    }, slowBlur);
  };

  const finalInputClassName = `${s.checkbox} ${className || ''}`;
  const id = useId();
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
      {children && <span className={s.spanClassName}>{children}</span>}
    </label>
  );
};

export default SuperCheckbox;
