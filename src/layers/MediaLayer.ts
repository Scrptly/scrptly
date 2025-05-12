import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface MediaLayerSettings extends VisualLayerSettings {
	source: string;
	sourceType?: 'url' | 'mediaId' | 'base64';
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
			'objectFit': {
				cssProperty: 'object-fit',
				units: [''],
				default: 'cover',
				animatable: false,
			},
		};
	}

}