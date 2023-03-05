import { useMemo, useRef } from 'react';
import cn from 'classnames';

import SettingsIcon from 'assets/settings-icon.svg';
import AudioIcon from 'assets/audio-icon.svg';
import VideoIcon from 'assets/video-icon.svg';
import ScreenShareIcon from 'assets/screen-share-icon.svg';
import PhoneCallIcon from 'assets/phone-call-icon.svg';
import FullScreeIcon from 'assets/full-screen-icon.svg';

import { transformSecondsToTime } from 'utils/time';
import useAgora from 'hooks/useAgora';

import styles from './index.module.scss';

type Props = {
  appId: string;
  channel: string;
  token: string;
  uid?: string;
};

const ChatVideo: React.FC<Props> = ({ appId, channel, token, uid }) => {
  const fullScreenRef = useRef<HTMLDivElement>(null);
  const joinParams = useMemo(() => ({
    appId,
    token,
    channel,
    uid,
  }), [appId, channel, token, uid]);
  const {
    onlineTimeSeconds,
    screenShareEnabled,
    videoTrackMuted,
    audioTrackMuted,
    ready,
    toggleShareScreen,
    toggleMuteVideo,
    toggleMuteAudio,
    leave,
    basicCall,
  } = useAgora(joinParams, '.small-video', '.large-video');

  const makeFullScreen = () => {
    if (!fullScreenRef.current) return;
    fullScreenRef.current.requestFullscreen();
  };

  return (
    <div className={styles.container} ref={fullScreenRef}>
      <div className={styles.videoViewContainer}>
        <div className={cn(styles.videoView, 'large-video')} />
        <div className={cn(styles.smallVideoView, 'small-video')} />
      </div>
      <div className={styles.controlContainer}>
        <div className={styles.timer}>
          <div className={styles.time}>
            <span>{transformSecondsToTime(onlineTimeSeconds)}</span>
          </div>
          <div className={styles.extend}>Extend</div>
        </div>
        <div className={styles.btnGroup}>
          <img src={SettingsIcon} alt='settings' />
          <img
            src={AudioIcon}
            alt='audio'
            style={{ opacity: audioTrackMuted ? 0.5 : 1 }}
            title={audioTrackMuted ? 'unmute audio' : 'mute audio'}
            onClick={toggleMuteAudio}
          />
          <img
            src={VideoIcon}
            alt='video'
            style={{ opacity: videoTrackMuted ? 0.5 : 1 }}
            title={videoTrackMuted ? 'unmute video' : 'mute video'}
            onClick={toggleMuteVideo}
          />
          <img
            src={ScreenShareIcon}
            alt='share screen'
            style={{ opacity: screenShareEnabled ? 0.5 : 1 }}
            title={screenShareEnabled ? 'stop sharing' : 'share screen'}
            onClick={toggleShareScreen}
          />
          <img
            src={PhoneCallIcon}
            alt='leave'
            style={{ opacity: ready ? 1 : 0.5 }}
            title={ready ? 'leave' : 'join'}
            onClick={ready ? leave : basicCall}
          />
        </div>
        <div className={styles.fullScreenBtn} onClick={makeFullScreen}>
          <img src={FullScreeIcon} alt='full screen' />
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;
