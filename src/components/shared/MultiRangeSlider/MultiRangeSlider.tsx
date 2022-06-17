/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState, useRef, FC } from 'react';

import s from './MultiRangeSlider.module.css';

type PropsType = {
  min: number;
  max: number;
  onChange: any;
};

const MAX_PERCENT = 100;
const ONE = 1;

export const MultiRangeSlider: FC<PropsType> = ({ min, max, onChange }) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<any>(null);
  const maxValRef = useRef<any>(null);
  const range = useRef<any>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * MAX_PERCENT),
    [min, max],
  );

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value);

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={s.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={event => {
          const value = Math.min(+event.target.value, maxVal - ONE);

          setMinVal(value);
          event.target.value = value.toString();
        }}
        className={`${s.thumb} ${s['thumb--zindex-3']} ${
          minVal > max - MAX_PERCENT ? s['thumb--zindex-5'] : ''
        }`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={event => {
          const value = Math.max(+event.target.value, minVal + ONE);

          setMaxVal(value);
          event.target.value = value.toString();
        }}
        className={`${s.thumb} ${s['thumb--zindex-4']}`}
      />

      <div className={s.slider}>
        <div className={s.slider__track} />
        <div ref={range} className={s.slider__range} />
        <div className={s['slider__left-value']}>{minVal}</div>
        <div className={s['slider__right-value']}>{maxVal}</div>
      </div>
    </div>
  );
};
