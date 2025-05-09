import { VisualLayer, VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface TextualLayerProperties extends VisualLayerProperties {
	textAlign?: string;
	fontFamily?: string;
	fontSize?: number;
	color?: string;
	stroke?: string;
	strokeWidth?: number;
	textShadow?: string;
	textShadowColor?: string;
	textShadowOffsetX?: number;
	textShadowOffsetY?: number;
	textShadowBlur?: number;
}

export interface TextualLayerSettings extends VisualLayerSettings { }

export class TextualLayer extends VisualLayer {
	properties!: TextualLayerProperties;
	static type = 'textual';
	settings!: TextualLayerSettings;

	constructor(parent: any, properties: TextualLayerProperties = {}, settings: TextualLayerSettings = {}) {
		super(parent, properties, settings);
	}
}