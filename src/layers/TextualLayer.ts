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
				cssProperty: 'text-align',
				units: [''],
				enum: ['left', 'right', 'center', 'justify'],
				default: 'center',
				animatable: false,
			},
			'fontFamily': {
				cssProperty: 'font-family',
				units: [''],
				default: 'Arial',
				animatable: false,
			},
			'fontSize': {
				cssProperty: 'font-size',
				units: ['em', 'px'],
				default: 1.0,
				animatable: true,
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
				cssProperty: '-webkit-text-stroke-width',
				units: ['px'],
				default: 0,
				animatable: true,
			},
			'strokeColor': {
				cssProperty: '-webkit-text-stroke-color',
				units: [''],
				default: '#000000',
				animatable: false,
			},
			'textShadow': {
				units: [''],
				default: false,
				animatable: false,
			},
			'textShadowColor': {
				cssProperty: 'text-shadow-color',
				units: [''],
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
		};
	}

}