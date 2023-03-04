import styles from './index.module.scss';

type Props = {
  size?: number;
  imgUrl?: string;
};

const Avatar: React.FC<Props> = ({ imgUrl, size = 40 }) => {
  return (
    <div
      className={styles.container}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {imgUrl && <img src={imgUrl} alt='avatar' />}
    </div>
  );
};

export default Avatar;
