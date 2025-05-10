import { AudioLayer, AudioLayerProperties, AudioLayerSettings } from './AudioLayer';

export interface TTSLayerSettings extends AudioLayerSettings {
	voice: string;
	model: string;
}
export interface TTSLayerProperties extends AudioLayerProperties { }

export class TTSLayer extends AudioLayer {
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
		this.parent.pushAction({ statement: 'ttsSay', layer: this.id, text });
		return this;
	}
}