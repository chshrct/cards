import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    useState,
} from "react";
import s from "./SuperInputPassword.module.css";
import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg';
import { ReactComponent as EyeSlashIcon } from '../../../assets/icons/eye-slash.svg';

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & {
    // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void;
    onEnter?: () => void;
    error?: string;
    spanClassName?: string;
};

const SuperInputText: React.FC<SuperInputTextPropsType> = ({
    type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
    onChange,
    onChangeText,
    onKeyPress,
    onEnter,
    error,
    className,
    spanClassName,
    ...restProps // все остальные пропсы попадут в объект restProps
}) => {
    const [inputType, setInputType] = useState<string>('password');
    const passwordVisibleToggler = () => {
        setInputType(inputType === 'text' ? 'password' : 'text');
    }
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && // если есть пропс onChange
            onChange(e); // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value);
    };
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter && // если есть пропс onEnter
            e.key === "Enter" && // и если нажата кнопка Enter
            onEnter(); // то вызвать его
    };

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ""}`;
    const finalInputClassName = `${error ? s.superInput + " " + s.errorInput : s.superInput
        } ${className}`; // need to fix with (?:) and s.superInput
    return (
        <>
            <div className={s.superInputWrapper}>
                <input
                    type={inputType}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                {inputType === 'password'
                    ? <EyeIcon onClick={passwordVisibleToggler} className={s.eyeIcon} height={25} width={25} fill={error && 'red'} />
                    : <EyeSlashIcon onClick={passwordVisibleToggler} className={s.eyeIcon} height={25} width={25} fill={error && 'red'} />}
            </div>
            {<span className={finalSpanClassName}>{error}</span>}
        </>
    );
};

export default SuperInputText;
