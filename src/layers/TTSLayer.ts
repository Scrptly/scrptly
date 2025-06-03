import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer';

export interface TTSLayerSettings extends AuditoryLayerSettings {
	voice?: string | "default"; // A search term for finding the voice, or "default", or "id:<voice_id>" for a specific voice ID, or "auto" to let Scrptly choose the best voice
	model: string;
	modelSettings?: any;
	cache?: boolean; // whether to cache the TTS output
}
export interface TTSLayerProperties extends AuditoryLayerProperties { }

export default class TTSLayer extends AuditoryLayer {
	static type = 'tts';
	declare settings: TTSLayerSettings;
	declare properties: TTSLayerProperties;
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
	

	say(text: string, settings: {
		wait?: boolean // default: true
	} = {}) {
		this.parent.pushAction({ statement: 'ttsSay', id: this.id, text, settings });
		return this;
	}
}