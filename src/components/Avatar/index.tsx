import cn from 'classnames';

import styles from './index.module.scss';

type Props = {
  className?: string;
  size?: number;
  imgUrl?: string;
  name?: string;
};

const DEFAULT_AVATAR_SIZE = 40;

const Avatar: React.FC<Props> = ({ imgUrl, size = DEFAULT_AVATAR_SIZE, name, className }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={cn(styles.container, className)} style={containerStyle}>
      {imgUrl && <img src={imgUrl} alt='avatar' />}
      {name && <span className={styles.name}>{name[0].toUpperCase()}</span>}
    </div>
  );
};

export default Avatar;
