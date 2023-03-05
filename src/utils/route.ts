import { RouteObject } from 'react-router-dom';

import routes from 'constants/routes';

type CrumbRoute = RouteObject & { crumbParents?: string[] };

export const makeBreadcrumbs = (route: CrumbRoute | null) => {
  if (!route) return [];

  const homeRoute = routes.find(item => item.path === '/') as CrumbRoute;
  const result: Function[] = [homeRoute.handle.crumb];

  if (route.path === '/') {
    return result;
  }

  route.crumbParents?.forEach((path) => {
    const pRoute = routes.find(r => r.path === path) as CrumbRoute;
    if (pRoute.handle.crumb) {
      result.push(pRoute.handle.crumb);
    }
  });

  if (route.handle.crumb) {
    result.push(route.handle.crumb);
  }

  return result;
};
