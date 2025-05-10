import { MediaLayer, MediaLayerSettings, MediaLayerProperties } from './MediaLayer';

export interface ImageLayerSettings extends MediaLayerSettings { }
export interface ImageLayerProperties extends MediaLayerProperties { }

export class ImageLayer extends MediaLayer {
	static type = 'image';
	settings!: ImageLayerSettings;
	properties!: ImageLayerProperties;

	static get defaultSettings(): Partial<ImageLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}

	static get defaultProperties(): Partial<ImageLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}

	constructor(parent: any, properties: ImageLayerProperties = {}, settings: ImageLayerSettings) {
		super(parent, properties, settings);
	}
}