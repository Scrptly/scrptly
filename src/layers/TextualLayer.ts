import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface TextualLayerProperties extends VisualLayerProperties {
	textAlign?: string;
	fontFamily?: string;
	fontSize?: number;
	color?: string;
	stroke?: boolean;
	strokeWidth?: number;
	strokeColor?: string;
	textShadow?: boolean;
	textShadowColor?: string;
	textShadowOffsetX?: number;
	textShadowOffsetY?: number;
	textShadowBlur?: number;
}

export interface TextualLayerSettings extends VisualLayerSettings { }

export default class TextualLayer extends VisualLayer {
	properties!: TextualLayerProperties;
	static type = 'textual';
	settings!: TextualLayerSettings;

	static get defaultProperties(): Partial<TextualLayerProperties> {
		return {
			...super.defaultProperties,

			textAlign: 'center',
			fontFamily: 'Arial',
			fontSize: 1.0,
			color: '#000000',

			stroke: false,
			strokeWidth: 0,
			strokeColor: '#000000',

			textShadow: false,
			textShadowColor: '#000000',
			textShadowOffsetX: 0,
			textShadowOffsetY: 0,
			textShadowBlur: 0,
		};
	}

	constructor(parent: any, properties: TextualLayerProperties = {}, settings: TextualLayerSettings = {}) {
		super(parent, properties, settings);
	}
}