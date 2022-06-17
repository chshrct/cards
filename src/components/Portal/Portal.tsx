import { FC, useRef, MutableRefObject, ReactNode, useLayoutEffect } from 'react';

import ReactDOM from 'react-dom';

type PropsType = {
  children?: ReactNode;
};

const Portal: FC<PropsType> = ({ children }) => {
  const container = useRef(
    document.createElement('div'),
  ) as MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    const containerToAppend = container.current;

    document.body.appendChild(containerToAppend);

    return () => {
      document.body.removeChild(containerToAppend);
    };
  }, []);

  return ReactDOM.createPortal(children, container.current);
};

export default Portal;
