import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import authSelectors from 'redux/auth/authSelectors';

import SharedLayout from 'components/sharedLayout';
import LoaderSpinner from 'components/loaderSpinner';

import RouteNames from 'router/routes';

// COMMON ROUTES
const Home = lazy(() => import('pages/home'));
// const MarketPage = lazy(() => import('pages/marketPage'));
// const Market = lazy(() => import('pages/marketPage/market'));
// const LotPage = lazy(() => import('pages/marketPage/lotPage'));
// const Lot = lazy(() => import('pages/marketPage/lotPage/lot'));
// const Manual = lazy(() => import('pages/marketPage/lotPage/manual'));

// PUBLIC ROUTES
// const Signup = lazy(() => import('pages/signup'));
// const Login = lazy(() => import('pages/login'));
// const ForgotPassword = lazy(() => import('pages/forgotPassword'));

// PRIVATE ROUTES
// const AccountPage = lazy(() => import('pages/accountPage'));
// const Dashboard = lazy(() => import('pages/accountPage/dashboard'));
// const Settings = lazy(() => import('pages/accountPage/settings'));

function Router() {
  const { pathname } = useLocation();

  const isAuthorized = useSelector(authSelectors.isAuthorized);

  const publicRoutes = (
    <Route path={RouteNames.HOME} element={<SharedLayout />}>
      <Route index element={<Home />} />

      {/* <Route path={RouteNames.MARKET} element={<MarketPage />}>
        <Route index element={<Market />} />
        <Route path={RouteNames.LOT} element={<LotPage />}>
          <Route index element={<Lot />} />
          <Route path={RouteNames.MANUAL} element={<Manual />} />
        </Route>
      </Route> */}

      {/* <Route path={RouteNames.LOGIN} element={<Login />} />
      <Route path={RouteNames.SIGNUP} element={<Signup />} />
      <Route path={RouteNames.FORGOTPASSWORD} element={<ForgotPassword />} /> */}

      <Route
        path={RouteNames.ANY}
        element={<Navigate to={RouteNames.HOME} replace />}
      />
    </Route>
  );

  const privateRoutes = (
    <Route path={RouteNames.HOME} element={<SharedLayout />}>
      <Route index element={<Home />} />

      {/* <Route path={RouteNames.MARKET} element={<MarketPage />}>
        <Route index element={<Market />} />
        <Route path={RouteNames.LOT} element={<LotPage />}>
          <Route index element={<Lot />} />
          <Route path={RouteNames.MANUAL} element={<Manual />} />
        </Route>
      </Route>

      <Route path={RouteNames.ACCOUNT} element={<AccountPage />}>
        <Route index element={<Dashboard />} />
        <Route path={RouteNames.SETTINGS} element={<Settings />} />
      </Route> */}

      <Route
        path={RouteNames.ANY}
        element={<Navigate to={RouteNames.HOME} replace />}
      />
    </Route>
  );

  const routes = isAuthorized ? privateRoutes : publicRoutes;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return (
    <Suspense fallback={<LoaderSpinner />}>
      <Routes>{routes}</Routes>
    </Suspense>
  );
}

export default Router;
