import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import * as Sentry from '@sentry/react';

import appSelectors from 'redux/app/appSelectors';
import authSelectors from 'redux/auth/authSelectors';

import { setScreenHeight } from 'redux/app/appSlice';

import userOperations from 'redux/user/userOperations';

import Router from 'router';

import LoaderSpinner from 'components/loaderSpinner';

Notify.init({
  width: '280px',
  position: 'right-bottom',
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

function App() {
  const dispatch = useDispatch();
  const displayLoader = useSelector(appSelectors.displayLoader);
  const displayMenu = useSelector(appSelectors.displayMenu);
  const displayModal = useSelector(appSelectors.displayModal);
  const isAuthorized = useSelector(authSelectors.isAuthorized);

  // Запрет скролла при открытии меню
  useEffect(() => {
    if (displayMenu || displayLoader || displayModal) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = 'fixed';
    } else {
      const scrolly = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, Number.parseInt(scrolly || '0', 10) * -1);
    }
  }, [displayLoader, displayMenu, displayModal]);

  useEffect(() => {
    const handleResize = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--window-height', `${window.innerHeight}px`);
      dispatch(setScreenHeight(window.innerHeight));
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAuthorized) dispatch(userOperations.getUser());
  }, [dispatch, isAuthorized]);

  return (
    <>
      <Router />
      {displayLoader && <LoaderSpinner />}
    </>
  );
}

export default App;
