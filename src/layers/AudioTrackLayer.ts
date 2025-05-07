import { AudioLayer, AudioLayerProperties, AudioLayerSettings } from './AudioLayer';

export interface AudioTrackLayerSettings extends AudioLayerSettings {
  source: string;
  sourceType?: 'url' | 'mediaId' | 'base64';
}
export interface AudioTrackLayerProperties extends AudioLayerProperties {}

export class AudioTrackLayer extends AudioLayer {
  settings!: AudioTrackLayerSettings;
  properties!: AudioTrackLayerProperties;
  static type = 'audioTrack';

  constructor(parent: any, settings: AudioTrackLayerSettings, properties: AudioTrackLayerProperties = {}) {
    super(parent, settings, properties);
    this.settings = {
      sourceType: 'url',
      ...this.settings,
    };
  }
}