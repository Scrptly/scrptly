import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer';
import type { Time, Easing } from '../types';

export interface VisualLayerProperties extends BaseLayerProperties {
	visible?: boolean;
	opacity?: number;
	blendMode?: string;
	position?: [number, number];
	scale?: [number, number];
	rotation?: number;
	anchor?: [number, number];
}

export interface VisualLayerSettings extends BaseLayerSettings { }

export default class VisualLayer extends BaseLayer {
	properties!: VisualLayerProperties;
	static type = 'visual';
	settings!: VisualLayerSettings;

	constructor(parent: any, properties: VisualLayerProperties = {}, settings: VisualLayerSettings) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<VisualLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<VisualLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'visible': {
				units: [''],
				default: true,
				animatable: false,
			},
			'opacity': {
				units: [''],
				default: 1,
				animatable: true,
			},
			'blendMode': {
				cssProperty: 'mix-blend-mode',
				units: [''],
				enum: [
					'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
					'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
					'exclusion', 'hue', 'saturation', 'color', 'luminosity',
				],
				default: 'normal',
				animatable: false,
			},
			'position': {
				cssProperty: '--position',
				units: [''],
				default: [0, 0],
				animatable: true,
			},
			'scale': {
				cssProperty: '--scale',
				units: [''],
				default: [1, 1],
				animatable: true,
			},
			'rotation': {
				cssProperty: '--rotation',
				units: [''],
				default: 0,
				animatable: true,
			},
			'anchor': {
				cssProperty: '--anchor',
				units: [''],
				default: [0.5, 0.5],
				animatable: false,
			},
		};
	}


	show() { return this.set({ visible: true }); }
	hide() { return this.set({ visible: false }); }
	toggle() { return this.set({ visible: !this.properties.visible }); }
	fadeIn(duration: Time = '300ms', easing: Easing = 'linear') {
		return this.animate({ opacity: 0, visible: true }, { opacity: 1 }, {duration, easing});
	}
	fadeOut(duration: Time = '300ms', easing: Easing = 'linear') {
		return this.animate({ opacity: 1 }, { opacity: 0, visible: false }, {duration, easing});
	}
}