import { FC, useEffect } from 'react';

import { ReactComponent as Loader } from '../assets/icons/loader.svg';

import s from './App.module.css';
import { initializeApp } from './appReducer';

import { ProgressInfinite } from 'components/shared/ProgressInfinite/ProgressInfinite';
import { AppRouter } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

const App: FC = () => {
  const isLoading = useAppSelector(state => state.app.isLoading);
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized)
    return (
      <div className={s.loaderContainer}>
        <Loader />
      </div>
    );
  return (
    <>
      {isLoading && <ProgressInfinite />}
      <AppRouter />
    </>
  );
};

export default App;
