import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer';

export type AudioLayerSettings =
	| (AuditoryLayerSettings & {
		source: string;
		sourceType?: 'url' | 'asset' | 'base64' | 'file';
	})
	| (AuditoryLayerSettings & {
		prompt: string;
		duration?: number; // duration in seconds
		modelSettings?: any;
	});
export type AudioLayerProperties = AuditoryLayerProperties;

export default class AudioLayer extends AuditoryLayer {
	static type = 'audio';
	declare settings: AudioLayerSettings;
	declare properties: AudioLayerProperties;

	constructor(parent: any, properties: AudioLayerProperties = {}, settings: AudioLayerSettings) {
		super(parent, properties, settings);
		if('source' in settings && 'source' in this.settings && settings.source && !settings.sourceType)
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