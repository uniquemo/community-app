import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import MatchPage from './pages/Match';
import HubPage from './pages/Hub';
import ErrorPage from './pages/Error';
import Layout from './components/Layout';

import { hubPageSidebarItems, level1PageSidebarItems } from 'constants/sidebar';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout sidebarItems={level1PageSidebarItems}>
        <HomePage />
      </Layout>
    ),
    errorElement: <ErrorPage />,
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
    path: '/match/:matchId/hub',
    element: (
      <Layout sidebarItems={hubPageSidebarItems}>
        <HubPage />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
