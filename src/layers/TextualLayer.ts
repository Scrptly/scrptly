import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface TextualLayerProperties extends VisualLayerProperties {
	fontSize?: number;
	fontFamily?: string;
	fontWeight?: string | number;
	fontStyle?: string;
	color?: string;
	textAlign?: string;
	verticalAlign?: string;
	padding?: number | [number, number, number, number];
	stroke?: boolean;
	strokeWidth?: number;
	strokeColor?: string;
	textShadow?: boolean;
	textShadowColor?: string;
	textShadowOffsetX?: number;
	textShadowOffsetY?: number;
	textShadowBlur?: number;
	letterSpacing?: number;
	lineHeight?: number;
	textTransform?: string;
	textDecoration?: string;
	wordSpacing?: number;
	direction?: string;
	whiteSpace?: string;
	textIndent?: number;
}

export interface TextualLayerSettings extends VisualLayerSettings { }

export default class TextualLayer extends VisualLayer {
	properties!: TextualLayerProperties;
	static type = 'textual';
	settings!: TextualLayerSettings;

	constructor(parent: any, properties: TextualLayerProperties = {}, settings: TextualLayerSettings = {}) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<TextualLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<TextualLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'fontSize': {
				cssProperty: 'font-size',
				units: ['em', 'px'],
				default: 1.0,
				animatable: true,
			},
			'fontFamily': {
				cssProperty: 'font-family',
				default: 'Noto Sans',
				animatable: false,
			},
			'fontWeight': {
				cssProperty: 'font-weight',
				default: 400,
				animatable: true,
			},
			'fontStyle': {
				cssProperty: 'font-style',
				enum: ['normal', 'italic', 'oblique'],
				default: 'normal',
				animatable: false,
			},
			'color': {
				default: '#FFFFFF',
				animatable: true,
			},
			'textAlign': {
				cssProperty: 'text-align',
				enum: ['left', 'right', 'center', 'justify'],
				default: 'center',
				animatable: false,
			},
			'verticalAlign': {
				cssProperty: 'vertical-align',
				enum: ['top', 'middle', 'bottom'],
				default: 'middle',
				animatable: false,
			},
			'padding': {
				cssProperty: 'padding',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'stroke': {
				default: false,
				animatable: false,
			},
			'strokeWidth': {
				cssProperty: '-webkit-text-stroke-width',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'strokeColor': {
				cssProperty: '-webkit-text-stroke-color',
				default: '#000000',
				animatable: false,
			},
			'textShadow': {
				default: false,
				animatable: false,
			},
			'textShadowColor': {
				cssProperty: 'text-shadow-color',
				default: '#000000',
				animatable: false,
			},
			'textShadowOffsetX': {
				cssProperty: 'text-shadow-offset-x',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'textShadowOffsetY': {
				cssProperty: 'text-shadow-offset-y',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'textShadowBlur': {
				cssProperty: 'text-shadow-blur',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'letterSpacing': {
				cssProperty: 'letter-spacing',
				units: ['em', 'px'],
				default: 0,
				animatable: true,
			},
			'lineHeight': {
				cssProperty: 'line-height',
				units: ['em', 'px', ''],
				default: 1.2,
				animatable: true,
			},
			'textTransform': {
				cssProperty: 'text-transform',
				enum: ['none', 'capitalize', 'uppercase', 'lowercase'],
				default: 'none',
				animatable: false,
			},
			'textDecoration': {
				cssProperty: 'text-decoration',
				enum: ['none', 'underline', 'overline', 'line-through'],
				default: 'none',
				animatable: false,
			},
			'wordSpacing': {
				cssProperty: 'word-spacing',
				units: ['em', 'px'],
				default: 0,
				animatable: true,
			},
			'textIndent': {
				cssProperty: 'text-indent',
				units: ['em', 'px'],
				default: 0,
				animatable: true,
			},
			'direction': {
				cssProperty: 'direction',
				enum: ['ltr', 'rtl'],
				default: 'ltr',
				animatable: false,
			},
		};
	}

}