import AudioLayer, { AudioLayerProperties, AudioLayerSettings } from './AudioLayer.js';
export interface AudioTrackLayerSettings extends AudioLayerSettings {
    source: string;
    sourceType?: 'url' | 'mediaId' | 'base64';
}
export interface AudioTrackLayerProperties extends AudioLayerProperties {
}
export default class AudioTrackLayer extends AudioLayer {
    settings: AudioTrackLayerSettings;
    properties: AudioTrackLayerProperties;
    static type: string;
    constructor(parent: any, properties: AudioTrackLayerProperties | undefined, settings: AudioTrackLayerSettings);
    static get defaultSettings(): Partial<AudioTrackLayerSettings>;
    static get defaultProperties(): Partial<AudioTrackLayerProperties>;
}
