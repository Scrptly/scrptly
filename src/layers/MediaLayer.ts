import { VisualLayer, VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface MediaLayerSettings extends VisualLayerSettings {
	source: string;
	sourceType?: 'url' | 'mediaId' | 'base64';
}

export interface MediaLayerProperties extends VisualLayerProperties {
	objectFit?: string;
}

export class MediaLayer extends VisualLayer {
	settings!: MediaLayerSettings;
	properties!: MediaLayerProperties;
	static type = 'media';

	constructor(parent: any, properties: MediaLayerProperties = {}, settings: MediaLayerSettings) {
		super(parent, properties, settings);
		this.settings = {
			sourceType: 'url',
			...this.settings,
		};
		this.properties = {
			objectFit: 'cover',
			...this.properties,
		};
	}
}