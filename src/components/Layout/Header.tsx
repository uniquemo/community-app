import { useNavigate } from 'react-router-dom';

import Breadcrumb from 'components/Breadcrumb';
import Avatar from 'components/Avatar';

import HelpIcon from 'assets/help-icon.svg';
import BellIcon from 'assets/bell-icon.svg';
import MessageIcon from 'assets/message-icon.svg';
import GlobeIcon from 'assets/globe-icon.svg';
import DownArrowIcon from 'assets/down-arrow-icon.svg';
import LogoIcon from 'assets/logo-icon.svg';

import useLocalStorage from 'hooks/useLocalStorage';

import styles from './header.module.scss';

const Header = () => {
  const [username, ,removeItem] = useLocalStorage('user');
  const navigate = useNavigate();

  const logout = () => {
    removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar imgUrl={LogoIcon} className={styles.logo} />
        <Breadcrumb />
      </div>
      <div className={styles.right}>
        <div className={styles.timezone}>
          <img src={GlobeIcon} alt='globe' />
          <span>UTC - 05:00 Chicago</span>
          <img src={DownArrowIcon} alt='down arrow' />
        </div>
        <img src={HelpIcon} alt='help icon' />
        <img src={MessageIcon} alt='message icon' />
        <img src={BellIcon} alt='bell icon' />
        <div onClick={logout} title='logout'>
          <Avatar size={36} name={username} />
        </div>
      </div>
    </div>
  );
}

export default Header;
