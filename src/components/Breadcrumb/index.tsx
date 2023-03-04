import { Link, useLocation, useMatches } from 'react-router-dom';
import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
  items: { name: string; link?: string; }[];
};

const Breadcrumb: React.FC<Props> = ({ items = [] }) => {
  const location = useLocation();
  const matches = useMatches();
  console.log('location => ', location);
  console.log('matches => ', matches);

  return (
    <div className={styles.container}>
      {items.map(({ name, link = '' }, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <div key={index}>
            {link
              ? <Link to={link} className={cn(styles.name, styles.link, isLastItem && styles.lastItem)}>{name}</Link>
              : <span className={cn(styles.name, isLastItem && styles.lastItem)}>{name}</span>
            }
            {!isLastItem && <span className={styles.slash}>/</span>}
          </div>
        );
      })}
    </div>
  );
}

export default Breadcrumb;
