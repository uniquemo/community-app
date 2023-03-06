import { RouteObject } from 'react-router-dom';

import ROUTES from 'constants/routes';

type CrumbRoute = RouteObject & { crumbParents?: string[] };

export const makeBreadcrumbs = (route: CrumbRoute | null) => {
  const homeRoute = ROUTES.find(item => item.path === '/') as CrumbRoute;
  if (!route || route.path === '/') return [homeRoute.handle.crumb];

  const result: Function[] = [homeRoute.handle.crumb];

  route.crumbParents?.forEach((path) => {
    const pRoute = ROUTES.find(r => r.path === path) as CrumbRoute;
    if (pRoute.handle.crumb) {
      result.push(pRoute.handle.crumb);
    }
  });

  if (route.handle.crumb) {
    result.push(route.handle.crumb);
  }

  return result;
};
