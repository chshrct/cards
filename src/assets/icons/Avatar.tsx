import { ElementType } from 'react';

// eslint-disable-next-line react/prop-types
export const Avatar: ElementType = ({ className }) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#21268f" d="M0 0H512V512H0z" />
      <g fill="#fff">
        <path d="M334 260c-12 11-17 16-32 24-26 13-65 13-91 0-14-7-22-13-32-24-8 3-15 7-23 10-23 8-44 11-57 37-13 25-20 72-22 103-3 28-5 35 18 43 16 6 32 10 49 14 88 20 136 19 224 0 17-3 33-8 49-14 22-8 21-13 18-43-2-34-10-100-36-121-13-11-26-13-43-19-8-3-15-7-22-10z" />
        <path d="M242 31c-24 2-42 10-57 25-2 3-5 4-7 7-21 30-24 59-17 99 3 22 10 43 20 62 3 6 7 11 11 16 5 9 21 20 30 24 15 6 31 8 48 6 55-8 81-71 84-134 4-74-44-111-112-105z" />
      </g>
    </svg>
  );
};
