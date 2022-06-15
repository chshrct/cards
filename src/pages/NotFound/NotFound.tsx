import React, { FC } from 'react';

import s from './NotFound.module.css';

export const NotFound: FC = () => {
  return (
    <div className={s.container}>
      <iframe
        width="1120"
        height="630"
        src="https://www.youtube.com/embed/P5EG9A26tL8"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        // @ts-ignore
        autoPlay
      />
    </div>
  );
};
