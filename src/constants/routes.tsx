import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';

import Layout from 'components/Layout';
import Loading from 'components/Loading';

import { HUB_PAGE_SIDEBAR_ITEMS, LEVEL_1_PAGE_SIDEBAR_ITEMS } from 'constants/sidebar';
import { FAKE_MATCH_TITLE } from 'constants/fake';

const HomePage = React.lazy(() => import('pages/Home'));
const MatchPage = React.lazy(() => import('pages/Match'));
const HubPage = React.lazy(() => import('pages/Hub'));
const ErrorPage = React.lazy(() => import('pages/Error'));
const LoginPage = React.lazy(() => import('pages/Login'));

const WithLoading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
}

const ROUTES = [
  {
    path: '/',
    element: (
      <Layout sidebarItems={LEVEL_1_PAGE_SIDEBAR_ITEMS}>
        <WithLoading>
          <HomePage />
        </WithLoading>
      </Layout>
    ),
    errorElement: <WithLoading><ErrorPage /></WithLoading>,
    handle: {
      crumb: () => <Link to='/'>Home</Link>
    },
  },
  {
    path: '/match',
    element: (
      <Layout sidebarItems={LEVEL_1_PAGE_SIDEBAR_ITEMS}>
        <WithLoading>
          <MatchPage />
        </WithLoading>
      </Layout>
    ),
    handle: {
      crumb: () => <Link to='/match'>Match</Link>
    },
  },
  {
    path: '/match/:matchId',
    loader: async () => {
      return FAKE_MATCH_TITLE;
    },
    element: (
      <Layout sidebarItems={LEVEL_1_PAGE_SIDEBAR_ITEMS}>
        <WithLoading>
          <MatchPage />
        </WithLoading>
      </Layout>
    ),
    handle: {
      crumb: () => FAKE_MATCH_TITLE,
    },
    crumbParents: ['/match'],
  },
  {
    path: '/match/:matchId/hub',
    element: (
      <Layout sidebarItems={HUB_PAGE_SIDEBAR_ITEMS}>
        <WithLoading>
          <HubPage />
        </WithLoading>
      </Layout>
    ),
    crumbParents: ['/match', '/match/:matchId'],
    handle: {
      crumb: () => <span>Hub</span>,
    },
  },
  {
    path: '/login',
    element: (
      <WithLoading>
        <LoginPage />
      </WithLoading>
    ),
  }
];

export default ROUTES;
