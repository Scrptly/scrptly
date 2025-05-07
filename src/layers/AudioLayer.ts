import { BaseLayer, BaseLayerSettings, BaseLayerProperties } from './BaseLayer';

export interface AudioLayerProperties extends BaseLayerProperties {
  volume?: number;
  pan?: number;
  pitch?: number;
  mute?: boolean;
}

export interface AudioLayerSettings extends BaseLayerSettings {}

export class AudioLayer extends BaseLayer {
  properties!: AudioLayerProperties;
  static type = 'audio';
  settings!: AudioLayerSettings;

  constructor(parent: any, settings: AudioLayerSettings, properties: AudioLayerProperties = {}) {
    super(parent, settings, properties);
    this.properties = {
		volume: 1,
		pan: 0,
		pitch: 1,
		mute: false,
      ...this.properties, // Inherit properties from BaseLayer
    };
  }
}