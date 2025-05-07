import { MediaLayer, MediaLayerSettings, MediaLayerProperties } from './MediaLayer';

export interface VideoLayerSettings extends MediaLayerSettings {}
export interface VideoLayerProperties extends MediaLayerProperties {}

export class VideoLayer extends MediaLayer {
  static type = 'video';
  settings!: VideoLayerSettings;
  properties!: VideoLayerProperties;

  constructor(parent: any, settings: VideoLayerSettings, properties: VideoLayerProperties = {}) {
    super(parent, settings, properties);
  }
}