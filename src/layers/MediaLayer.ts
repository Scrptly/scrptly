import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';


export type MediaLayerSettingsStatic = VisualLayerSettings & {
	source: string;
	sourceType?: 'url' | 'asset' | 'base64' | 'file';
};
export type MediaLayerSettingsDynamic = VisualLayerSettings & {
	prompt: string; // Prompt to use for generating media
	model: 'unsplash' | 'openai' | 'google' | 'falai' | string; // Model to use for generating media Submodel can be specified like this: falai:stable-diffusion
	// Note: unsplash has a special setting modelSettings.random which will randomly select a photo from the unsplash search results otherwise it will use the first result
	modelSettings?: any;
	cache?: boolean; // Whether to cache the generated media or to regenerate it every time (default: true)
};

export type MediaLayerSettings = MediaLayerSettingsStatic | MediaLayerSettingsDynamic;
export type MediaLayerProperties = VisualLayerProperties & {
	objectFit?: string;
};

export default class MediaLayer extends VisualLayer {
	static type = 'media';
	declare settings: MediaLayerSettings;
	declare properties: MediaLayerProperties;

	constructor(parent: any, properties: MediaLayerProperties = {}, settings: MediaLayerSettings) {
		super(parent, properties, settings);
		if('source' in settings && 'source' in this.settings && settings.source && !settings.sourceType)
			this.settings.sourceType = this.autoDetermineSourceType(settings.source);
	}
	static get isAsset() {
		return true;
	}
	static get defaultSettings(): Partial<MediaLayerSettings> {
		return {
			...super.defaultSettings,
			sourceType: 'url',
		};
	}
	static get defaultProperties(): Partial<MediaLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'fit': { // Changes the whole element's size/box to contain or cover the project dimensions
				enum: ['contain', 'cover'],
				default: 'contain',
				animatable: false,
			},
			'objectFit': { // Changes the object-fit property of the element
				cssProperty: 'object-fit',
				enum: ['fill', 'contain', 'cover'],
				default: 'fill',
				animatable: false,
			},
		};
	}

}