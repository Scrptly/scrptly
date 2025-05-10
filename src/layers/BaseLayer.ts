import type Scrptly from '../index';
import type { Id, Time, Easing } from '../types';
import { randomUUID } from 'crypto';

export interface BaseLayerSettings {
	name?: string;
	enabled?: boolean;
	locked?: boolean;
	startTime?: number;
	endTime?: number;
	speed?: number;
}

export interface BaseLayerProperties { }

export default class BaseLayer {
	readonly id: Id;
	static type = 'base';
	settings: BaseLayerSettings;
	properties: BaseLayerProperties;
	protected parent: Scrptly;

	constructor(parent: Scrptly, properties: BaseLayerProperties = {}, settings: BaseLayerSettings) {
		this.parent = parent;
		this.id = randomUUID();
		this.settings = {
				...((this.constructor as typeof BaseLayer).defaultSettings),
				...settings,
		};
		this.properties = {
				...((this.constructor as typeof BaseLayer).defaultProperties),
				...properties
		};
	}

	static get defaultSettings(): Partial<BaseLayerSettings> {
		return {
			name: 'Layer',
			enabled: true,
			locked: false,
			startTime: 0,
			endTime: Infinity,
			speed: 1,
		};
	}
	static get defaultProperties(): Partial<BaseLayerProperties> {
		return {};
	}

	set(value: Record<string, any>) {
		this.parent.pushAction({ statement: 'set', layer: this.id, value });
		return this;
	}

	animate(
		from: Record<string, any>,
		to: Record<string, any>,
		duration: Time,
		easing: Easing
	) {
		this.parent.pushAction({ statement: 'animate', layer: this.id, from, to, duration, easing });
		return this;
	}
}
