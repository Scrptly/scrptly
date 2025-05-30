import MediaLayer, { MediaLayerSettings, MediaLayerProperties } from './MediaLayer';
import AuditoryLayer, { AuditoryLayerSettings, AuditoryLayerProperties } from './AuditoryLayer';

export interface VideoLayerSettings extends MediaLayerSettings, AuditoryLayerSettings { }
export interface VideoLayerProperties extends MediaLayerProperties, AuditoryLayerProperties { }

export default class VideoLayer extends MediaLayer {
	static type = 'video';
	declare settings: VideoLayerSettings;
	declare properties: VideoLayerProperties;

	constructor(parent: any, properties: VideoLayerProperties = {}, settings: VideoLayerSettings) {
		super(parent, properties, settings);
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