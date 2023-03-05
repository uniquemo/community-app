import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
  className?: string;
  size?: number;
  imgUrl?: string;
  name?: string;
};

const Avatar: React.FC<Props> = ({ imgUrl, size = 40, name, className }) => {
  return (
    <div
      className={cn(styles.container, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      {imgUrl && <img src={imgUrl} alt='avatar' />}
      {name && <span className={styles.name}>{name[0].toUpperCase()}</span>}
    </div>
  );
};

export default Avatar;
