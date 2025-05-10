import { TextualLayer, TextualLayerProperties, TextualLayerSettings } from './TextualLayer';

export interface TextLayerProperties extends TextualLayerProperties {
	text?: string;
}
export interface TextLayerSettings extends TextualLayerSettings { }

export class TextLayer extends TextualLayer {
	properties!: TextLayerProperties;
	settings!: TextLayerSettings;
	static type = 'text';

	static get defaultProperties(): Partial<TextLayerProperties> {
		return {
			...super.defaultProperties,
			text: 'Type your text here',
		};
	}

	constructor(parent: any, properties: TextLayerProperties = {}, settings: TextLayerSettings = {}) {
		super(parent, properties, settings);
	}
}