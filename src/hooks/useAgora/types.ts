import {
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
} from 'agora-rtc-sdk-ng';

export type TrackMap = {
  videoTrack: ICameraVideoTrack | null;
  audioTrack: IMicrophoneAudioTrack | null;
  screenTrack?: ILocalVideoTrack | null;
};

export type JoinParams = {
  appId: string;
  channel: string;
  token: string;
  uid?: string;
};

export enum MediaTypeEnum {
  video = 'video',
  audio = 'audio',
}

export type MediaType = 'video' | 'audio';
