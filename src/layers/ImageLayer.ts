import MediaLayer, { MediaLayerSettings, MediaLayerProperties } from './MediaLayer';

export interface ImageLayerSettings extends MediaLayerSettings { }
export interface ImageLayerProperties extends MediaLayerProperties { }

export default class ImageLayer extends MediaLayer {
	static type = 'image';
	declare settings: ImageLayerSettings;
	declare properties: ImageLayerProperties;

	constructor(parent: any, properties: ImageLayerProperties = {}, settings: ImageLayerSettings) {
		super(parent, properties, settings);
	}
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
}