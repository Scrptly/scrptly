import MediaLayer, { MediaLayerSettingsStatic, MediaLayerSettingsDynamic, MediaLayerProperties } from './MediaLayer';
import AuditoryLayer, { AuditoryLayerSettings, AuditoryLayerProperties } from './AuditoryLayer';

export type VideoLayerSettings = (MediaLayerSettingsStatic | (MediaLayerSettingsDynamic & {
	duration?: number; // duration in seconds
	image? : {
		source: string;
		sourceType?: 'url' | 'asset' | 'base64' | 'file';
	} | {
		prompt: string;
		model: 'unsplash' | 'openai' | 'google' | 'falai' | string;
		modelSettings?: any;
		cache?: boolean;
	};
})) & AuditoryLayerSettings;
export type VideoLayerProperties = MediaLayerProperties & AuditoryLayerProperties;

export default class VideoLayer extends MediaLayer {
	static type = 'video';
	declare settings: VideoLayerSettings;
	declare properties: VideoLayerProperties;

	constructor(parent: any, properties: VideoLayerProperties = {}, settings: VideoLayerSettings) {
		super(parent, properties, settings);
		if(
			'image' in settings && settings.image && 'source' in settings.image &&
			'image' in this.settings && this.settings.image && 'source' in this.settings.image &&
			settings.image.source && !settings.image.sourceType
		)
			this.settings.image.sourceType = this.autoDetermineSourceType(settings.image.source) as any;
	}
	static get defaultSettings(): Partial<VideoLayerSettings> {
		return {
			...super.defaultSettings,
			...AuditoryLayer.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<VideoLayerProperties> {
		return {
			...super.defaultProperties,
			...AuditoryLayer.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		let props = super.propertiesDefinition;
		return {
			...props,
			...AuditoryLayer.propertiesDefinition,
			'fit': {
				...props.fit,
				default: 'cover',
			},
		};
	}
}