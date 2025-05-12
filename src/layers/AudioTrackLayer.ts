import AudioLayer, { AudioLayerProperties, AudioLayerSettings } from './AudioLayer';

export interface AudioTrackLayerSettings extends AudioLayerSettings {
	source: string;
	sourceType?: 'url' | 'mediaId' | 'base64';
}
export interface AudioTrackLayerProperties extends AudioLayerProperties { }

export default class AudioTrackLayer extends AudioLayer {
	settings!: AudioTrackLayerSettings;
	properties!: AudioTrackLayerProperties;
	static type = 'audioTrack';

	constructor(parent: any, properties: AudioTrackLayerProperties = {}, settings: AudioTrackLayerSettings) {
		super(parent, properties, settings);
	}

	static get defaultSettings(): Partial<AudioTrackLayerSettings> {
		return {
			...super.defaultSettings,
			sourceType: 'url',
		};
	}
	static get defaultProperties(): Partial<AudioTrackLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
}