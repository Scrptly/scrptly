import { AudioLayer } from './AudioLayer';

export class AudioTrackLayer extends AudioLayer {
  source!: string;
  sourceType!: 'url' | 'mediaId' | 'base64';
  static type = 'audioTrack';
}