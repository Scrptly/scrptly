import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer';

export interface AuditoryLayerProperties extends BaseLayerProperties {
	volume?: number;
	pan?: number;
	pitch?: number;
	mute?: boolean;
}

export interface AuditoryLayerSettings extends BaseLayerSettings { }

export default class AuditoryLayer extends BaseLayer {
	static type = 'auditory';
	declare properties: AuditoryLayerProperties;
	declare settings: AuditoryLayerSettings;

	constructor(parent: any, properties: AuditoryLayerProperties = {}, settings: AuditoryLayerSettings) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<AuditoryLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<AuditoryLayerProperties> {
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