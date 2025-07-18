import TextualLayer, { TextualLayerProperties, TextualLayerSettings } from './TextualLayer';

export type TextLayerProperties = TextualLayerProperties & {
	text?: string;
};
export type TextLayerSettings = TextualLayerSettings;

export default class TextLayer extends TextualLayer {
	static type = 'text';
	declare properties: TextLayerProperties;
	declare settings: TextLayerSettings;

	constructor(parent: any, properties: TextLayerProperties = {}, settings: TextLayerSettings = {}) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<TextLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<TextLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'text': {
				cssProperty: false,
				default: 'Type your text here',
				animatable: false,
			},
		};
	}

}