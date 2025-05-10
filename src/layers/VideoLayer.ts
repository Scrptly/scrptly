import { MediaLayer, MediaLayerSettings, MediaLayerProperties } from './MediaLayer';

export interface VideoLayerSettings extends MediaLayerSettings { }
export interface VideoLayerProperties extends MediaLayerProperties { }

export class VideoLayer extends MediaLayer {
	static type = 'video';
	settings!: VideoLayerSettings;
	properties!: VideoLayerProperties;

	static get defaultSettings(): Partial<VideoLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}

	static get defaultProperties(): Partial<VideoLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}

	constructor(parent: any, properties: VideoLayerProperties = {}, settings: VideoLayerSettings) {
		super(parent, properties, settings);
	}
}