import MessageItem from './MessageItem';
import ChatVideo from './ChatVideo';
import InfoCard from './InfoCard';

import styles from './index.module.scss';

const HubPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <div className={styles.tag}>1:1 Match</div>
          <div className={styles.title}>
            How to have a great career in a lifetime
          </div>
        </div>
        <div className={styles.content}>
          <ChatVideo />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <div className={styles.header}>You are chatting with:</div>
          <InfoCard />
          <div className={styles.messages}>
            {(new Array(10)).fill(true).map((item, index) => (
              <MessageItem key={index} />
            ))}
          </div>
        </div>
        <div className={styles.bottom}>
          <input placeholder='Type your message...' />
          <span className={styles.sendBtn} />
        </div>
      </div>
    </div>
  );
};

export default HubPage;
