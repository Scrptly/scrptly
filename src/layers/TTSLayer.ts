import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer';

export interface TTSLayerSettings extends AuditoryLayerSettings {
	voice: string;
	model: string;
}
export interface TTSLayerProperties extends AuditoryLayerProperties { }

export default class TTSLayer extends AuditoryLayer {
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
		this.parent.pushAction({ statement: 'ttsSay', id: this.id, text });
		return this;
	}
}