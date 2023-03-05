import { useNavigate } from 'react-router-dom';

import Header from './Header';
import Sidebar, { Props as SidebarProps } from './Sidebar';

import useLocalStorage from 'hooks/useLocalStorage';

import styles from './index.module.scss';
import { useEffect } from 'react';

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
  const navigate = useNavigate();
  const [storedValue] = useLocalStorage('user');

  useEffect(() => {
    if (!storedValue) {
      navigate('/login');
    }
  }, [navigate, storedValue]);

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
