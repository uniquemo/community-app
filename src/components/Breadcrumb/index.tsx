import useCurrentRoute from 'hooks/useRoutePath';
import { makeBreadcrumbs } from 'utils/route';

import styles from './index.module.scss';

const Breadcrumb = () => {
  const { route } = useCurrentRoute();
  const breadcrumbs = makeBreadcrumbs(route);

  return (
    <div className={styles.container}>
      {breadcrumbs.map((crumb, index) => {
        const isLastItem = index === breadcrumbs.length - 1;
        return (
          <div key={index} className={isLastItem ? styles.lastItem : ''}>
            {crumb()}
            {!isLastItem && <span className={styles.slash}>/</span>}
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
