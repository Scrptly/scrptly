import { BaseLayer } from './BaseLayer';

export class AudioLayer extends BaseLayer {
  volume = 1;
  pan = 0;
  pitch = 1;
  mute = false;
  static type = 'audio';
}