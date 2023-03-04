import SettingsIcon from 'assets/settings-icon.svg';
import AudioIcon from 'assets/audio-icon.svg';
import VideoIcon from 'assets/video-icon.svg';
import ScreenShareIcon from 'assets/screen-share-icon.svg';
import PhoneCallIcon from 'assets/phone-call-icon.svg';
import FullScreeIcon from 'assets/full-screen-icon.svg';

import styles from './index.module.scss';

const ChatVideo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoView}>
        <div className={styles.smallVideoView}></div>
      </div>
      <div className={styles.controlContainer}>
        <div className={styles.timer}>
          <div className={styles.time}>
            <span>01:59:00</span>
          </div>
          <div className={styles.extend}>Extend</div>
        </div>
        <div className={styles.btnGroup}>
          <img src={SettingsIcon} alt='settings' />
          <img src={AudioIcon} alt='audio' />
          <img src={VideoIcon} alt='video' />
          <img src={ScreenShareIcon} alt='share screen' />
          <img src={PhoneCallIcon} alt='phone call' />
        </div>
        <div className={styles.fullScreenBtn}>
          <img src={FullScreeIcon} alt='full screen' />
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;
