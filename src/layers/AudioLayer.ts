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

	constructor(parent: any, properties: AudioLayerProperties = {}, settings: AudioLayerSettings) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<AudioLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<AudioLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'volume': {
				default: 1,
				animatable: true,
			},
			'pan': {
				default: 0,
				animatable: true,
			},
			'pitch': {
				default: 1,
				animatable: true,
			},
			'mute': {
				default: false,
				animatable: false,
			},
		};
	}

}