import TextualLayer, { TextualLayerProperties, TextualLayerSettings } from './TextualLayer';
import { Id } from '../types';
import { text } from 'stream/consumers';

export type CaptionsLayerSettings = TextualLayerSettings & {
	source: string;// Could be  a URL to an audio file, a layer ID, or "project" to generate captions from timeline's audio
	sourceType?: 'url' | 'asset' | 'base64' | 'file' | Id | 'other'; // Type of the source, default is 'url'
	maxCharsPerLine?: number; // Maximum number of characters per line
	maxLines?: number; // Maximum number of lines to display
};
export type CaptionsLayerProperties = TextualLayerProperties;

export default class CaptionsLayer extends TextualLayer {
	static type = 'captions';
	declare settings: CaptionsLayerSettings;
	declare properties: CaptionsLayerProperties;

	constructor(parent: any, properties: CaptionsLayerProperties = {}, settings: CaptionsLayerSettings) {
		super(parent, properties, settings);
		if('source' in settings && 'source' in this.settings && settings.source && !settings.sourceType)
			this.settings.sourceType = this.autoDetermineSourceType(settings.source);
	}
	
	static get isAsset() {
		return true;
	}
	static get defaultSettings(): Partial<CaptionsLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<CaptionsLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}

	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'text': {
				cssProperty: false,
				default: undefined, // No default text, captions will be generated from the source
				animatable: false,
			},
		};
	}
}