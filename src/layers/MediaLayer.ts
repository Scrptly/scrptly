import { VisualLayer } from './VisualLayer';

export class MediaLayer extends VisualLayer {
  source!: string;
  sourceType!: 'url' | 'mediaId' | 'base64';
  objectFit?: string;
  static type = 'media';
}