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
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  return ReactDOM.createPortal(children, container.current);
};

export default Portal;
