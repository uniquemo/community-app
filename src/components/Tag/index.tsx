import styles from './index.module.scss';

type Props = {
  isLargeTag?: boolean;
  theme?: 'blue' | 'green';
  text: string;
};

const themeMap: { [key: string]: { color: string; bgColor: string; }  } = {
  blue: {
    color: '#45B1ED',
    bgColor: 'rgba(69, 177, 237, 0.05)',
  },
  green: {
    color: '#6CF3DB',
    bgColor: 'rgba(108, 243, 219, 0.1)',
  },
};

const Tag: React.FC<Props> = ({ text, isLargeTag = false, theme = 'blue' }) => {
  const { color, bgColor } = themeMap[theme] || themeMap['blue'];
  const tagClass = isLargeTag ? styles['largeTag'] : styles['smallTag'];

  return (
    <span className={tagClass} style={{ color, backgroundColor: bgColor }}>
      {text}
    </span>
  );
};

export default Tag;
