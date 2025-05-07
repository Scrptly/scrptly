import { VisualLayer } from './VisualLayer';

export class CaptionsLayer extends VisualLayer {
  source!: string;
  sourceType!: 'layer' | 'subtitles';
  static type = 'captions';
}