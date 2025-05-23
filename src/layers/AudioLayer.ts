import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer';

export interface AudioLayerSettings extends AuditoryLayerSettings {
	source: string;
	sourceType?: 'url' | 'asset' | 'base64' | 'file';
}
export interface AudioLayerProperties extends AuditoryLayerProperties { }

export default class AudioLayer extends AuditoryLayer {
	settings!: AudioLayerSettings;
	properties!: AudioLayerProperties;
	static type = 'audio';

	constructor(parent: any, properties: AudioLayerProperties = {}, settings: AudioLayerSettings) {
		super(parent, properties, settings);
		if(settings.source && !settings.sourceType)
			this.settings.sourceType = this.autoDetermineSourceType(settings.source);
	}
	static get isAsset() {
		return true;
	}

	static get defaultSettings(): Partial<AudioLayerSettings> {
		return {
			...super.defaultSettings,
			sourceType: 'url',
		};
	}
	static get defaultProperties(): Partial<AudioLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
}