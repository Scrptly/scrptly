import { BaseLayer, BaseLayerSettings, BaseLayerProperties } from './BaseLayer';
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

export class VisualLayer extends BaseLayer {
	properties!: VisualLayerProperties;
	static type = 'visual';
	settings!: VisualLayerSettings;

	static get defaultProperties(): Partial<VisualLayerProperties> {
		return {
			...super.defaultProperties,
			visible: true,
			opacity: 1,
			rotation: 0,
		};
	}

	constructor(parent: any, properties: VisualLayerProperties = {}, settings: VisualLayerSettings) {
		super(parent, properties, settings);
	}

	show() { return this.set({ visible: true }); }
	hide() { return this.set({ visible: false }); }
	toggle() { return this.set({ visible: !this.properties.visible }); }
	fadeIn(duration: Time = 300, easing: Easing = 'linear') {
		return this.animate({ opacity: 0, visible: true }, { opacity: 1 }, duration, easing);
	}
	fadeOut(duration: Time = 300, easing: Easing = 'linear') {
		return this.animate({ opacity: 1 }, { opacity: 0, visible: false }, duration, easing);
	}
}