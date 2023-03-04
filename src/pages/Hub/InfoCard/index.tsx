import { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import Avatar from 'components/Avatar';
import Tag from 'components/Tag';
import { checkIfTextOverflowed } from 'utils/dom';

import styles from './index.module.scss';

const InfoCard = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const toggleShowMore = () => {
    setIsOpened(previousVal => !previousVal);
  };

  const checkOverflow = useCallback(() => {
    const isOverflowed = checkIfTextOverflowed(textRef.current);
    setIsOverflowed(isOverflowed);
  }, []);

  useEffect(() => {
    checkOverflow();
  }, [checkOverflow])

  useEffect(() => {
    window.addEventListener('resize', checkOverflow);
    return () => {
      window.removeEventListener('resize', checkOverflow);
    }
  }, [checkOverflow]);

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <Avatar size={90} />
        <div className={styles.detail}>
          <Tag text='ATTENDEE' />
          <div className={styles.name}>Eduardo Mckinney</div>
          <div className={styles.shortIntro}>Head of Core Product Engineering @ Pinterest</div>
        </div>
      </div>
      <div className={styles.desc}>
        <div
          className={cn(styles.text, isOpened && styles.withoutEllipsis)}
          ref={textRef}
        >
          Eric S. Yuan founded Zoom in 2011. Prior to starting Zoom, Eric was Corporate Vice President of Engineering at Cisco, where he was responsible for Cisco's collaboration software development. As
          hahahahah, How do you do? hahahahah, How do you do? hahahahah, How do you do? 
        </div>
        {isOverflowed && (
          <div className={styles.showMoreBtn} onClick={toggleShowMore}>
            {isOpened ? 'Collapse' : '+ Show more'}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
