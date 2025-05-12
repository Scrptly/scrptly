import AudioLayer, { AudioLayerProperties, AudioLayerSettings } from './AudioLayer';

export interface TTSLayerSettings extends AudioLayerSettings {
	voice: string;
	model: string;
}
export interface TTSLayerProperties extends AudioLayerProperties { }

export default class TTSLayer extends AudioLayer {
	static type = 'tts';
	settings!: TTSLayerSettings;
	properties!: TTSLayerProperties;
	constructor(parent: any, properties: TTSLayerProperties = {}, settings: TTSLayerSettings) {
		super(parent, properties, settings);
	}

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
	

	say(text: string) {
		this.parent.pushAction({ statement: 'ttsSay', layer: this.id, text });
		return this;
	}
}