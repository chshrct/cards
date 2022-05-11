import React, { SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent } from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
    options,
    onChange,
    onChangeOption,
    className,
    ...restProps
}) => {

    const selectClassName = s.select + ' ' + (className?className:'')

    const mappedOptions: any[] = options
        ? options.map((o, i) => (
              <option key={o + '-' + i} value={o}>
                  {o}
              </option>
          ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // onChange, onChangeOption
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        e.currentTarget.blur() // lose focus on select, so .select:focus styles can work properly
    }

    return (
        <select className={selectClassName} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
