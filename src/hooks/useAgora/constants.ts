import { ClientConfig } from 'agora-rtc-sdk-ng';

import { TrackMap } from './types';

export const defaultClientConfig: ClientConfig = {
  mode: 'rtc',
  codec: 'vp8',
};

export const defaultLocalTrackMap: TrackMap = {
  videoTrack: null,
  audioTrack: null,
};

export const videoEncoderConfig = '720p_1';
export const audioEncoderConfig = 'speech_standard';
