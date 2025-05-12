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
			'textAlign': {
				units: [''],
				default: 'center',
				animatable: false,
				cssProperty: 'text-align',
			},
			'fontFamily': {
				units: [''],
				default: 'Arial',
				animatable: false,
				cssProperty: 'font-family',
			},
			'fontSize': {
				units: ['em', 'px'],
				default: 1.0,
				animatable: true,
				cssProperty: 'font-size',
			},
			'color': {
				units: [''],
				default: '#000000',
				animatable: true,
			},
			'stroke': {
				units: [''],
				default: false,
				animatable: false,
			},
			'strokeWidth': {
				units: ['px'],
				default: 0,
				animatable: true,
				cssProperty: 'stroke-width',
			},
			'strokeColor': {
				units: [''],
				default: '#000000',
				animatable: false,
				cssProperty: 'stroke',
			},
			'textShadow': {
				units: [''],
				default: false,
				animatable: false,
				// not a CSS property
			},
			'textShadowColor': {
				units: [''],
				default: '#000000',
				animatable: false,
				cssProperty: 'text-shadow-color',
			},
			'textShadowOffsetX': {
				units: ['px'],
				default: 0,
				animatable: true,
				cssProperty: 'text-shadow-offset-x',
			},
			'textShadowOffsetY': {
				units: ['px'],
				default: 0,
				animatable: true,
				cssProperty: 'text-shadow-offset-y',
			},
			'textShadowBlur': {
				units: ['px'],
				default: 0,
				animatable: true,
				cssProperty: 'text-shadow-blur',
			},
		};
	}

}