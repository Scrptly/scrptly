import MediaLayer, { MediaLayerSettings, MediaLayerProperties } from './MediaLayer';
import AudioLayer, { AudioLayerSettings, AudioLayerProperties } from './AudioLayer';

export interface VideoLayerSettings extends MediaLayerSettings, AudioLayerSettings { }
export interface VideoLayerProperties extends MediaLayerProperties, AudioLayerProperties { }

export default class VideoLayer extends MediaLayer {
	static type = 'video';
	settings!: VideoLayerSettings;
	properties!: VideoLayerProperties;

	constructor(parent: any, properties: VideoLayerProperties = {}, settings: VideoLayerSettings) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<VideoLayerSettings> {
		return {
			...super.defaultSettings,
			...AudioLayer.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<VideoLayerProperties> {
		return {
			...super.defaultProperties,
			...AudioLayer.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		let props = super.propertiesDefinition;
		return {
			...props,
			...AudioLayer.propertiesDefinition,
			'fit': {
				...props.fit,
				default: 'cover',
			},
		};
	}
}