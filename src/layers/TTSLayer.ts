import { AudioLayer, AudioLayerProperties, AudioLayerSettings } from './AudioLayer';
import type { TTSPrompt } from '../types';
import { BaseLayerSettings } from './BaseLayer';

export interface TTSLayerSettings extends AudioLayerSettings { }
export interface TTSLayerProperties extends AudioLayerProperties { }

export class TTSLayer extends AudioLayer {
	voice!: string;
	model!: string;
	prompts: TTSPrompt[] = [];
	static type = 'tts';
	settings!: TTSLayerSettings;
	properties!: TTSLayerProperties;

	static get defaultSettings(): Partial<TTSLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}

	static get defaultProperties(): Partial<TTSLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}

	constructor(parent: any, properties: TTSLayerProperties = {}, settings: TTSLayerSettings) {
		super(parent, properties, settings);
	}

	say(text: string) {
		const prompt: TTSPrompt = {
			text,
			startAt: this.prompts.length ? this.prompts[this.prompts.length - 1].startAt : 0
		};
		this.prompts.push(prompt);
		this.parent.pushAction({ statement: 'ttsSay', layer: this.id, text });
		return this;
	}
}