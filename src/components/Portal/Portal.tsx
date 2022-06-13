import { useEffect, FC, useRef, MutableRefObject, ReactNode } from 'react';

import ReactDOM from 'react-dom';

type PropsType = {
  children?: ReactNode;
};

const Portal: FC<PropsType> = ({ children }) => {
  const container = useRef(
    document.createElement('div'),
  ) as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  return ReactDOM.createPortal(children, container.current);
};

export default Portal;
