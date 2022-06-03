import { FC, useEffect } from 'react';

import './App.css';

import { initializeApp } from './appReducer';

import { AppRouter } from 'routes';
import { useAppDispatch, useAppSelector } from 'store';

const App: FC = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(state => state.app.isInitialized);
  useEffect(() => {
    dispatch(initializeApp());
  }, []);

  if (!isInitialized) return <h1>Loading</h1>;
  return <AppRouter />;
};

export default App;
