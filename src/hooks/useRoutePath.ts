import { matchRoutes, useLocation } from 'react-router-dom';

import ROUTES from 'constants/routes';

const useCurrentRoute = () => {
  const location = useLocation();
  const matches = matchRoutes(ROUTES, location.pathname);

  return {
    pathname: location.pathname,
    route: matches ? matches[0].route : null,
  };
};

export default useCurrentRoute;
