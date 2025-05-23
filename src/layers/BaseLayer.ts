import type Scrptly from '../index';
import type { Id, Time, Easing } from '../types';
import { randomUUID } from 'crypto';

export interface BaseLayerSettings {
	name?: string;
	enabled?: boolean;
	locked?: boolean;
	startTime?: number;
	endTime?: false | number;
	speed?: number;
}

export interface BaseLayerProperties { }
export interface PropertyDefinition {
	cssProperty?: string;
	units?: string[],
	default: any,
	animatable: boolean
}


export default class BaseLayer {
	readonly id: Id;
	static type = 'base';
	settings: BaseLayerSettings;
	properties: BaseLayerProperties;
	protected parent: Scrptly;

	private removed = false;

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
	autoDetermineSourceType(source: string) {
		if(source.startsWith('https://assets.scrptly.com/')) {
			return 'asset';
		} else if(source.startsWith('https://') || source.startsWith('http://')) {
			return 'url';
		} else if(source.startsWith('data:')) {
			return 'base64';
		} else if(source.startsWith('file://') || (!source.match(/[:=]/) && source.match(/[\.][a-z0-9]{3,4}$/i))) {
			return 'file';
		}
	}
	static get isAsset() {
		return false;
	}

	static get defaultSettings(): Partial<BaseLayerSettings> {
		return {
			name: 'Layer',
			enabled: true,
			locked: false,
			startTime: 0,
			endTime: false,
			speed: 1,
		};
	}
	static get defaultProperties(): Partial<BaseLayerProperties> {
		return Object.fromEntries(Object.entries(this.propertiesDefinition).map(([k, v])=>[k, v.default || '']));
	}
	static get propertiesDefinition(): Record<string, PropertyDefinition> {
		return {};
	}

	set(value: Record<string, any>) {
		this.parent.pushAction({ statement: 'set', id: this.id, value });
		return this;
	}

	animate(
		from: Record<string, any>,
		to: Record<string, any>,
		settings: {
			duration: Time,
			easing?: Easing,
			wait?: boolean
		} = {duration: 0}
	) {
		this.parent.pushAction({ statement: 'animate', id: this.id, from, to, settings });
		return this;
	}

	remove() {
		if(this.removed)
			throw new Error('Layer already removed');
		this.removed = true;
		this.parent.pushAction({ statement: 'removeLayer', id: this.id });
		return this;
	}
}
