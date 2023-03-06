import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ROUTES from 'constants/routes';

const router = createBrowserRouter(ROUTES);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
