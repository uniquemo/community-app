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

const ControlButton: React.FC<{
  icon: string;
  alt: string;
  muted?: boolean;
  title?: string;
  onClick?: () => void;
}> = ({ icon, alt, title, onClick, muted }) => {
  return (
    <img
      style={{ opacity: muted ? 0.5 : 1 }}
      title={title}
      src={icon}
      alt={alt}
      onClick={onClick}
    />
  );
};

const SMALL_VIDEO_CLASS = '.small-video';
const LARGE_VIDEO_CLASS = '.large-video';

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
  } = useAgora(joinParams, SMALL_VIDEO_CLASS, LARGE_VIDEO_CLASS);

  const makeFullScreen = () => {
    if (!fullScreenRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      fullScreenRef.current.requestFullscreen();
    }
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
          <ControlButton icon={SettingsIcon} alt='settings' />
          <ControlButton
            icon={AudioIcon}
            alt='audio'
            title={audioTrackMuted ? 'unmute audio' : 'mute audio'}
            muted={audioTrackMuted}
            onClick={toggleMuteAudio}
          />
          <ControlButton
            icon={VideoIcon}
            alt='video'
            title={videoTrackMuted ? 'unmute video' : 'mute video'}
            muted={videoTrackMuted}
            onClick={toggleMuteVideo}
          />
          <ControlButton
            icon={ScreenShareIcon}
            alt='share screen'
            title={screenShareEnabled ? 'stop sharing' : 'share screen'}
            muted={screenShareEnabled}
            onClick={toggleShareScreen}
          />
          <ControlButton
            icon={PhoneCallIcon}
            alt='leave'
            title={ready ? 'leave' : 'join'}
            muted={!ready}
            onClick={ready ? leave : basicCall}
          />
        </div>
        <div className={styles.fullScreenBtn} onClick={makeFullScreen}>
          <ControlButton icon={FullScreeIcon} alt='full screen' />
        </div>
      </div>
    </div>
  );
};

export default ChatVideo;
