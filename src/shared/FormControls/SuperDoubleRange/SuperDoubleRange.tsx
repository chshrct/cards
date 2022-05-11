// import { Slider } from '@mui/material'
import * as React from 'react'

type SuperDoubleRangePropsType = {
    onChangeRange?: (event: Event, value: number | number[], activeThumb: number) => void
    value?: [number, number]
    min?: number
    max?: number
    step?: number
    disable?: boolean
}

const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({
    onChangeRange,
    value,
    min,
    max,
    step,
    disable,
}) => {
    // сделать самому, можно подключать библиотеки

    return (
        <div></div>
        // <Slider
        //     sx={{
        //         width: 125,
        //         '& .MuiSlider-thumb': {
        //             width: 15,
        //             height: 15,
        //         },
        //         margin: '0 5px 0 5px',
        //     }}
        //     getAriaLabel={() => 'SuperDoubleRange'}
        //     value={value}
        //     onChange={onChangeRange}
        //     min={min}
        //     max={max}
        //     step={step}
        //     disabled={disable}
        //     disableSwap
        // />
    )
}

export default SuperDoubleRange
