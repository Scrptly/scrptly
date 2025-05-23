import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface MediaLayerSettings extends VisualLayerSettings {
	source: string;
	sourceType?: 'url' | 'asset' | 'base64' | 'file';
}

export interface MediaLayerProperties extends VisualLayerProperties {
	objectFit?: string;
}

export default class MediaLayer extends VisualLayer {
	settings!: MediaLayerSettings;
	properties!: MediaLayerProperties;
	static type = 'media';

	constructor(parent: any, properties: MediaLayerProperties = {}, settings: MediaLayerSettings) {
		super(parent, properties, settings);
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