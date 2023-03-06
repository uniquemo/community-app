import { ClientConfig } from 'agora-rtc-sdk-ng';

import { TrackMap } from './types';

export const DEFAULT_CLIENT_CONFIG: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const DEFAULT_LOCAL_TRACK_MAP: TrackMap = {
  videoTrack: null,
  audioTrack: null,
};

export const VIDEO_ENCODER_CONFIG = '720p_1';
export const AUDIO_ENCODER_CONFIG = 'speech_standard';
