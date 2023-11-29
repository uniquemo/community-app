import FaceFilterIcon from 'assets/face-filter.svg';
import BanIcon from 'assets/ban.svg';
import Popup from 'reactjs-popup';

import styles from './index.module.scss'
import { FaceFilterTempNames, FaceFilterTempList } from 'hooks/useAgora/helper';

export const FaceFilterAction: React.FC<{ 
  selected?: FaceFilterTempNames, 
  onSelect: (data?: FaceFilterTempNames) => Promise<void> 
}> = ({ 
  selected,
  onSelect 
}) => {

  return (
    <Popup on="click" 
      trigger={
        <img
          src={FaceFilterIcon}
          alt="face-filter"
        />
      }
      arrow={false}
      position={['top center']}
      contentStyle={{
        background: '#1d1c21',
        padding: 12,
        borderRadius: 8,
      }}
    >
      <div className={styles.tempList}>
      {
        FaceFilterTempList.map(({ name, icon }) => (
          <div key={name} className={`${styles.tempItem} ${selected === name ? styles.tempItemActive : ''}`} onClick={() => onSelect(name)} >
             <img
              src={icon}
              alt="face-filter"
            />
          </div>
        ))
      }
      <div className={styles.tempItem} onClick={() => onSelect()}>
        <img src={BanIcon}  alt="ban" />
      </div>
      </div>
    </Popup>
  )
}
