import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer.js';
export interface TTSLayerSettings extends AuditoryLayerSettings {
    voice: string;
    model: string;
}
export interface TTSLayerProperties extends AuditoryLayerProperties {
}
export default class TTSLayer extends AuditoryLayer {
    static type: string;
    settings: TTSLayerSettings;
    properties: TTSLayerProperties;
    constructor(parent: any, properties: TTSLayerProperties | undefined, settings: TTSLayerSettings);
    static get defaultSettings(): Partial<TTSLayerSettings>;
    static get defaultProperties(): Partial<TTSLayerProperties>;
    say(text: string): this;
}
