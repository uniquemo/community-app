import { Link } from 'react-router-dom';

import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';
import MatchPage from 'pages/Match';
import HubPage from 'pages/Hub';
import ErrorPage from 'pages/Error';
import Layout from 'components/Layout';

import { hubPageSidebarItems, level1PageSidebarItems } from 'constants/sidebar';
import { fakeMatchTitle } from 'constants/fake';

const routes = [
  {
    path: '/',
    element: (
      <Layout sidebarItems={level1PageSidebarItems}>
        <HomePage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => <Link to='/'>Home</Link>
    },
  },
  {
    path: '/match',
    element: (
      <Layout sidebarItems={level1PageSidebarItems}>
        <MatchPage />
      </Layout>
    ),
    handle: {
      crumb: () => <Link to='/match'>Match</Link>
    },
  },
  {
    path: '/match/:matchId',
    loader: async () => {
      return fakeMatchTitle;
    },
    element: (
      <Layout sidebarItems={level1PageSidebarItems}>
        <MatchPage />
      </Layout>
    ),
    handle: {
      crumb: () => fakeMatchTitle,
    },
    crumbParents: ['/match'],
  },
  {
    path: '/match/:matchId/hub',
    element: (
      <Layout sidebarItems={hubPageSidebarItems}>
        <HubPage />
      </Layout>
    ),
    crumbParents: ['/match', '/match/:matchId'],
    handle: {
      crumb: () => <span>Hub</span>,
    },
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
];

export default routes;
