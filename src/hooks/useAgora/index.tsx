import { useRef, useEffect, useCallback, useState } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  ClientConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  IAgoraRTCRemoteUser,
  ILocalVideoTrack,
  UID,
} from 'agora-rtc-sdk-ng';

import { TrackMap, JoinParams, MediaTypeEnum, MediaType } from './types';
import { toggleDOMVisibility, setDOMId } from 'utils/dom';
import {
  DEFAULT_CLIENT_CONFIG,
  DEFAULT_LOCAL_TRACK_MAP,
  VIDEO_ENCODER_CONFIG,
  AUDIO_ENCODER_CONFIG
} from './constants';

const useAgora = (joinParams: JoinParams, localPlayerContainerSelector: string, remotePlayerContainerSelector: string) => {
  const timerRef = useRef<number | null>(null);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localTrackMapRef = useRef<TrackMap>(DEFAULT_LOCAL_TRACK_MAP);
  const localPlayerRef = useRef<HTMLElement | null>(null);
  const remotePlayerRef = useRef<HTMLElement | null>(null);

  const [onlineTimeSeconds, setOnlineTimeSeconds] = useState(0);
  const [videoTrackMuted, setVideoTrackMuted] = useState(false);
  const [audioTrackMuted, setAudioTrackMuted] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const createClient = useCallback((config: ClientConfig = DEFAULT_CLIENT_CONFIG) => {
    if (!clientRef.current) {
      clientRef.current = AgoraRTC.createClient(config);
    }
    return clientRef.current;
  }, []);

  const createLocalTrackMap = useCallback(async () => {
    if (!localTrackMapRef.current.videoTrack) {
      const localVideoTrack: ICameraVideoTrack = await AgoraRTC.createCameraVideoTrack({ encoderConfig: VIDEO_ENCODER_CONFIG });
      localTrackMapRef.current.videoTrack = localVideoTrack;
    }

    if (!localTrackMapRef.current.audioTrack) {
      const localAudioTrack: IMicrophoneAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: AUDIO_ENCODER_CONFIG,
      });
      localTrackMapRef.current.audioTrack = localAudioTrack;
    }
  }, []);

  const join = useCallback(async () => {
    if (!clientRef.current || !localPlayerRef.current) return;
    if (clientRef.current.connectionState !== 'DISCONNECTED') return;
    const localUID: UID = await clientRef.current.join(joinParams.appId, joinParams.channel, joinParams.token, joinParams.uid);
    setDOMId(localPlayerRef.current, localUID.toString());
    toggleDOMVisibility(localPlayerRef.current, true);

    const { videoTrack, audioTrack } = localTrackMapRef.current;
    if (!videoTrack || !audioTrack) return;

    localTrackMapRef.current.videoTrack?.play(localPlayerRef.current);
    // localTrackMapRef.current.audioTrack?.play();   // 不播放本地音频轨道
    await clientRef.current.publish([audioTrack, videoTrack]);
    setReady(true);
  }, [
    joinParams.appId,
    joinParams.channel,
    joinParams.token,
    joinParams.uid,
  ]);

  const subscribe = useCallback(() => {
    if (!clientRef.current) return;

    const showRemotePlayerContainer = () => {
      if (!remotePlayerRef.current) return;
      toggleDOMVisibility(remotePlayerRef.current, true);
    };

    const hideRemotePlayerContainer = () => {
      if (!remotePlayerRef.current) return;
      toggleDOMVisibility(remotePlayerRef.current, false);
    };

    clientRef.current.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: MediaType) => {      
      if (!clientRef.current) return;
      await clientRef.current.subscribe(user, mediaType);

      if (mediaType === MediaTypeEnum.video && remotePlayerRef.current) {
        setDOMId(remotePlayerRef.current, user.uid.toString());
        user.videoTrack?.play(remotePlayerRef.current);
        showRemotePlayerContainer();
      }

      if (mediaType === MediaTypeEnum.audio) {
        user.audioTrack?.play();
      }
    });

    clientRef.current.on('user-unpublished', (user, mediaType) => {
      if (mediaType === MediaTypeEnum.video && remotePlayerRef.current) {
        hideRemotePlayerContainer();
      }
    });
  }, []);

  const toggleMuteVideo = useCallback(async () => {
    if (!localTrackMapRef.current.videoTrack) return;
    await localTrackMapRef.current.videoTrack.setMuted(!videoTrackMuted);
    setVideoTrackMuted(prevValue => !prevValue);
  }, [videoTrackMuted]);

  const toggleMuteAudio = useCallback(async () => {
    if (!localTrackMapRef.current.audioTrack) return;
    await localTrackMapRef.current.audioTrack.setMuted(!audioTrackMuted);
    setAudioTrackMuted(prevValue => !prevValue);
  }, [audioTrackMuted]);

  const toggleShareScreen = useCallback(async () => {
    if (!clientRef.current || !localPlayerRef.current) return;
    if (!screenShareEnabled) {
      const screenTrack = await AgoraRTC.createScreenVideoTrack({ encoderConfig: VIDEO_ENCODER_CONFIG });
      localTrackMapRef.current.screenTrack = screenTrack as ILocalVideoTrack;
  
      if (localTrackMapRef.current.videoTrack) {
        localTrackMapRef.current.videoTrack?.stop();
        await clientRef.current.unpublish(localTrackMapRef.current.videoTrack);
      }
  
      await clientRef.current.publish(screenTrack);
      (screenTrack as ILocalVideoTrack).play(localPlayerRef.current);
      setScreenShareEnabled(true);
      return;
    }

    localTrackMapRef.current.screenTrack?.stop();
    await clientRef.current.unpublish(localTrackMapRef.current.screenTrack!);
    await clientRef.current.publish(localTrackMapRef.current.videoTrack!);
    localTrackMapRef.current.videoTrack?.play(localPlayerRef.current);
    setScreenShareEnabled(false);
  }, [screenShareEnabled]);

  const resetStatus = useCallback(() => {
    toggleDOMVisibility(localPlayerRef.current!, false);
    setOnlineTimeSeconds(0);
    setVideoTrackMuted(false);
    setAudioTrackMuted(false);
    setScreenShareEnabled(false);
    setReady(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  const leave = useCallback(async () => {
    for (const trackName in localTrackMapRef.current) {
      const track = localTrackMapRef.current[trackName as keyof TrackMap];
      if (track) {
        track.stop();
        track.close();
        localTrackMapRef.current[trackName as keyof TrackMap] = null;
      }
    }

    if (clientRef.current && localTrackMapRef.current.videoTrack) {
      await clientRef.current.unpublish(localTrackMapRef.current.videoTrack);
    }

    resetStatus();
    await clientRef.current?.leave();
  }, [resetStatus]);
  
  const basicCall = useCallback(async () => {
    createClient();
    await createLocalTrackMap();
    await join();
    subscribe();
  }, [createLocalTrackMap, createClient, join, subscribe]);

  useEffect(() => {
    if (ready) {
      timerRef.current = window.setInterval(() => {
        setOnlineTimeSeconds(prevValue => prevValue + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [ready]);

  useEffect(() => {
    if (!localPlayerRef.current) {
      localPlayerRef.current = document.querySelector(localPlayerContainerSelector) as HTMLElement;
    }

    if (!remotePlayerRef.current) {
      remotePlayerRef.current = document.querySelector(remotePlayerContainerSelector) as HTMLElement;
    }
  }, [localPlayerContainerSelector, remotePlayerContainerSelector]);

  useEffect(() => {
    basicCall();
  }, [basicCall]);

  useEffect(() => {
    return () => {
      leave();
    };
  }, [leave]);

  return {
    client: clientRef.current,
    createClient,
    createLocalTrackMap,
    join,
    subscribe,
    basicCall,
    toggleMuteVideo,
    toggleMuteAudio,
    leave,
    toggleShareScreen,
    videoTrackMuted,
    audioTrackMuted,
    screenShareEnabled,
    onlineTimeSeconds,
    ready,
  };
};

export default useAgora;
