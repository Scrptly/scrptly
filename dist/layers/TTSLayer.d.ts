import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer.js';
export interface TTSLayerSettings extends AuditoryLayerSettings {
    voice?: string | "default";
    model: string;
    modelSettings?: any;
    cache?: boolean;
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
    say(text: string, settings?: {
        wait?: boolean;
    }): this;
}
