import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer';

export interface AudioLayerProperties extends BaseLayerProperties {
	volume?: number;
	pan?: number;
	pitch?: number;
	mute?: boolean;
}

export interface AudioLayerSettings extends BaseLayerSettings { }

export default class AudioLayer extends BaseLayer {
	properties!: AudioLayerProperties;
	static type = 'audio';
	settings!: AudioLayerSettings;

	static get defaultProperties(): Partial<AudioLayerProperties> {
		return {
			...super.defaultProperties,
			volume: 1,
			pan: 0,
			pitch: 1,
			mute: false,
		};
	}

	constructor(parent: any, properties: AudioLayerProperties = {}, settings: AudioLayerSettings) {
		super(parent, properties, settings);
	}
}