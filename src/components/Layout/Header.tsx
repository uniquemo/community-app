import Avatar from 'components/Avatar';

import HelpIcon from 'assets/help-icon.svg';
import BellIcon from 'assets/bell-icon.svg';
import MessageIcon from 'assets/message-icon.svg';
import GlobeIcon from 'assets/globe-icon.svg';
import DownArrowIcon from 'assets/down-arrow-icon.svg';

import styles from './header.module.scss';
import Breadcrumb from 'components/Breadcrumb';

const Header = () => {
  const breadcrumbItems = [
    {
      name: 'ELC Community',
      link: '/'
    },
    {
      name: 'Match',
    },
    {
      name: 'How to have a great career in a lifetime',
    },
    {
      name: 'Hub',
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Avatar />
        <Breadcrumb items={breadcrumbItems} />
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
        <Avatar size={36} />
      </div>
    </div>
  );
}

export default Header;
