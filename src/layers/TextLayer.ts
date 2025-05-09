import { TextualLayer, TextualLayerProperties, TextualLayerSettings } from './TextualLayer';

export interface TextLayerProperties extends TextualLayerProperties {
	text?: string;
}
export interface TextLayerSettings extends TextualLayerSettings { }

export class TextLayer extends TextualLayer {
	properties!: TextLayerProperties;
	settings!: TextLayerSettings;
	static type = 'text';

	constructor(parent: any, properties: TextLayerProperties = {}, settings: TextLayerSettings = {}) {
		super(parent, properties, settings);
		this.properties = {
			text: 'Type your text here',
			...this.properties,
		};
	}
}