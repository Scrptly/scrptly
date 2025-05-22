import AudioLayer, { AudioLayerProperties, AudioLayerSettings } from './AudioLayer.js';
export interface TTSLayerSettings extends AudioLayerSettings {
    voice: string;
    model: string;
}
export interface TTSLayerProperties extends AudioLayerProperties {
}
export default class TTSLayer extends AudioLayer {
    static type: string;
    settings: TTSLayerSettings;
    properties: TTSLayerProperties;
    constructor(parent: any, properties: TTSLayerProperties | undefined, settings: TTSLayerSettings);
    static get defaultSettings(): Partial<TTSLayerSettings>;
    static get defaultProperties(): Partial<TTSLayerProperties>;
    say(text: string): this;
}
