import styles from './index.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>Loading...</div>
    </div>
  )
};

export default Loading;
