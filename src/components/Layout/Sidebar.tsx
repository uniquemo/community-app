import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import styles from './sidebar.module.scss';

export type Props = {
  items: { name: string; link: string; }[];
};

const Sidebar: React.FC<Props> = ({ items }) => {
  const { pathname } = useLocation();
  const parentPath = pathname.slice(0, pathname.lastIndexOf('/'));

  return (
    <div className={styles.container}>
      {items.map(({ name, link }) => {
        const isLinkStartedWithSlash = link?.startsWith('/');
        const concatLink = parentPath ? `${parentPath}/${link}` : link;
        const finalLink = isLinkStartedWithSlash ? link : concatLink;
        return (
          <Link key={link} to={finalLink}>
            <div className={cn(styles.item, finalLink === pathname && styles.active)}>{name}</div>
          </Link>
        );
      })}
      <div className={styles.tag}>COMMUNITY</div>
    </div>
  );
};

export default Sidebar;
