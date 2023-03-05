import { matchRoutes, useLocation } from 'react-router-dom';

import routes from 'constants/routes';

const useCurrentRoute = () => {
  const location = useLocation();
  const matches = matchRoutes(routes, location.pathname);

  return {
    pathname: location.pathname,
    route: matches ? matches[0].route : null,
  };
};

export default useCurrentRoute;
