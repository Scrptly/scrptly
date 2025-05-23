import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface CaptionsLayerSettings extends VisualLayerSettings {
	source: string;
	sourceType?: 'layer' | 'subtitles';
}
export interface CaptionsLayerProperties extends VisualLayerProperties { }

export default class CaptionsLayer extends VisualLayer {
	source!: string;
	sourceType!: 'layer' | 'subtitles';
	static type = 'captions';
	declare settings: CaptionsLayerSettings;
	declare properties: CaptionsLayerProperties;

	constructor(parent: any, properties: CaptionsLayerProperties = {}, settings: CaptionsLayerSettings) {
		super(parent, properties, settings);
	}
	
	static get defaultSettings(): Partial<CaptionsLayerSettings> {
		return {
			...super.defaultSettings,
			sourceType: 'layer',
		};
	}
	static get defaultProperties(): Partial<CaptionsLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
}