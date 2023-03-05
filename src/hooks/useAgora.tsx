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

type TrackMap = {
  videoTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
  screenTrack?: ILocalVideoTrack | null;
};

type JoinParams = {
  appId: string;
  channel: string;
  token: string;
  uid?: string;
};

enum MediaType {
  video = 'video',
  audio = 'audio',
}

const defaultClientConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

const defaultLocalTrackMap: TrackMap = {
  videoTrack: null,
  audioTrack: null,
};

const useAgora = (joinParams: JoinParams, localPlayerContainerId: string, remotePlayerContainerId: string) => {
  const timerRef = useRef<number | null>(null);
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localTrackMapRef = useRef<TrackMap>(defaultLocalTrackMap);
  const remoteUsersRef = useRef<Record<UID, IAgoraRTCRemoteUser>>({});
  const [onlineTimeSeconds, setOnlineTimeSeconds] = useState(0);
  const [videoTrackMuted, setVideoTrackMuted] = useState(false);
  const [audioTrackMuted, setAudioTrackMuted] = useState(false);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  const createClient = useCallback((config: ClientConfig = defaultClientConfig) => {
    if (!clientRef.current) {
      clientRef.current = AgoraRTC.createClient(config);
    }
    return clientRef.current;
  }, []);

  const createLocalTrackMap = useCallback(async (): Promise<TrackMap> => {
    if (!localTrackMapRef.current.videoTrack) {
      const localVideoTrack: ICameraVideoTrack = await AgoraRTC.createCameraVideoTrack({
        encoderConfig: '720p_1',
      });
      localTrackMapRef.current.videoTrack = localVideoTrack;
    }

    if (!localTrackMapRef.current.audioTrack) {
      const localAudioTrack: IMicrophoneAudioTrack = await AgoraRTC.createMicrophoneAudioTrack({
        encoderConfig: 'music_standard'
      });
      localTrackMapRef.current.audioTrack = localAudioTrack;
    }

    return localTrackMapRef.current;
  }, []);

  const join = useCallback(async () => {
    const localPlayerContainer = document.querySelector(localPlayerContainerId) as HTMLElement;
    if (!clientRef.current || !localPlayerContainer) {
      return;
    };

    const localUID: UID = await clientRef.current.join(joinParams.appId, joinParams.channel, joinParams.token, joinParams.uid);
    localPlayerContainer.id = localUID.toString();
    localPlayerContainer.style.opacity = '1'; // TODO

    const { videoTrack, audioTrack } = localTrackMapRef.current;
    if (!videoTrack || !audioTrack) {
      return;
    }

    localTrackMapRef.current.videoTrack?.play(localPlayerContainer);
    localTrackMapRef.current.audioTrack?.play();
    await clientRef.current.publish([audioTrack, videoTrack]);
    return localUID;
  }, [
    joinParams.appId,
    joinParams.channel,
    joinParams.token,
    joinParams.uid,
    localPlayerContainerId,
  ]);

  const subscribe = useCallback(() => {
    if (!clientRef.current) {
      return;
    }

    const remotePlayerContainer = document.querySelector(remotePlayerContainerId) as HTMLElement;
    const showRemotePlayerContainer = () => {
      if (!remotePlayerContainer) return;
      remotePlayerContainer.style.opacity = '1';
    };
    const hideRemotePlayerContainer = () => {
      if (!remotePlayerContainer) return;
      remotePlayerContainer.style.opacity = '0';
    };

    clientRef.current.on('user-published', async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {      
      if (!clientRef.current) return;
      await clientRef.current.subscribe(user, mediaType);

      if (mediaType === MediaType.video && remotePlayerContainer) {
        remotePlayerContainer.id = user.uid.toString();
        user.videoTrack?.play(remotePlayerContainer);
        showRemotePlayerContainer();
      }

      if (mediaType === MediaType.audio) {
        user.audioTrack?.play();
      }
    });

    clientRef.current.on('user-unpublished', (user, mediaType) => {
      if (mediaType === MediaType.video && remotePlayerContainer) {
        hideRemotePlayerContainer();
      }
    });

    clientRef.current.on('user-joined', (user) => {
      remoteUsersRef.current[user.uid] = user;
    });

    clientRef.current.on('user-left', (user) => {
      delete remoteUsersRef.current[user.uid];
    });
  }, [remotePlayerContainerId]);

  const toggleMuteVideo = useCallback(async () => {
    if (!localTrackMapRef.current.videoTrack) {
      return;
    }

    await localTrackMapRef.current.videoTrack.setMuted(!videoTrackMuted);
    setVideoTrackMuted(prevValue => !prevValue);
  }, [videoTrackMuted]);

  const toggleMuteAudio = useCallback(async () => {
    if (!localTrackMapRef.current.audioTrack) {
      return;
    }

    await localTrackMapRef.current.audioTrack.setMuted(!audioTrackMuted);
    setAudioTrackMuted(prevValue => !prevValue);
  }, [audioTrackMuted]);

  const leave = useCallback(async () => {
    for (const trackName in localTrackMapRef.current) {
      const track = localTrackMapRef.current[trackName as keyof TrackMap];
      if (track) {
        track.stop();
        track.close();
        localTrackMapRef.current[trackName as keyof TrackMap] = null;
      }
    }

    const localPlayerContainer = document.querySelector(localPlayerContainerId) as HTMLElement; // TODO
    localPlayerContainer.style.opacity = '0';
    await clientRef.current?.leave();
    setReady(false);
    setOnlineTimeSeconds(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [localPlayerContainerId]);

  const toggleShareScreen = useCallback(async () => {
    const localPlayerContainer = document.querySelector(localPlayerContainerId) as HTMLElement;
    if (!clientRef.current || !localPlayerContainer) return;
    if (!screenShareEnabled) {
      const screenTrack = await AgoraRTC.createScreenVideoTrack({
        encoderConfig: '720p_1',
      });
      localTrackMapRef.current.screenTrack = screenTrack as ILocalVideoTrack;
  
      if (localTrackMapRef.current.videoTrack) {
        localTrackMapRef.current.videoTrack?.stop();
        await clientRef.current.unpublish(localTrackMapRef.current.videoTrack);
      }
  
      await clientRef.current.publish(screenTrack);
      (screenTrack as ILocalVideoTrack).play(localPlayerContainer);
      setScreenShareEnabled(true);
    } else {
      localTrackMapRef.current.screenTrack?.stop();
      await clientRef.current.unpublish(localTrackMapRef.current.screenTrack!);
      await clientRef.current.publish(localTrackMapRef.current.videoTrack!);
      localTrackMapRef.current.videoTrack?.play(localPlayerContainer);
      setScreenShareEnabled(false);
    }
  }, [localPlayerContainerId, screenShareEnabled]);
  
  const basicCall = useCallback(async () => {
    createClient();
    await createLocalTrackMap();
    await join();
    subscribe();
    setReady(true)

    timerRef.current = window.setInterval(() => {
      setOnlineTimeSeconds(prevValue => prevValue + 1);
    }, 1000);
  }, [createLocalTrackMap, createClient, join, subscribe]);

  useEffect(() => {
    basicCall();
  }, [basicCall]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  return {
    client: clientRef.current,
    createClient,
    createLocalTrackMap,
    join,
    subscribe,
    basicCall,
    videoTrackMuted,
    toggleMuteVideo,
    audioTrackMuted,
    toggleMuteAudio,
    ready,
    leave,
    screenShareEnabled,
    toggleShareScreen,
    onlineTimeSeconds,
  };
};

export default useAgora;
