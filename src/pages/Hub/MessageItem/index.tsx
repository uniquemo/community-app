import ManAvatar from 'assets/man-avatar.svg';
import Avatar from 'components/Avatar';
import Tag from 'components/Tag';

import styles from './index.module.scss';

const MessageItem = () => {
  return (
    <div className={styles.container}>
      <Avatar imgUrl={ManAvatar} />
      <div className={styles.rightContainer}>
        <div className={styles.intro}>
          <span className={styles.name}>Eduardo Mckinney</span>
          <Tag text='Attendee' />
          <span className={styles.shortIntro}>Principle Engineer @ App Dynamics</span>
        </div>
        <div className={styles.text}>
          Thanks everyone for joining the virtual booth! Hahaha, How are going? Long time no see.
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
