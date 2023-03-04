import Header from './Header';
import Sidebar, { Props as SidebarProps } from './Sidebar';

import styles from './index.module.scss';

type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
  showSidebar?: boolean;
  sidebarItems?: SidebarProps['items'];
};

const Layout: React.FC<Props> = ({
  children,
  showHeader = true,
  showSidebar = true,
  sidebarItems = [],
}) => {
  return (
    <div className={styles.container}>
      {showHeader && <Header />}
      <div className={styles.content}>
        {showSidebar && <Sidebar items={sidebarItems} />}
        {children}
      </div>
    </div>
  );
};

export default Layout;
