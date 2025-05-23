import AuditoryLayer, { AuditoryLayerProperties, AuditoryLayerSettings } from './AuditoryLayer.js';
export interface AudioLayerSettings extends AuditoryLayerSettings {
    source: string;
    sourceType?: 'url' | 'asset' | 'base64' | 'file';
}
export interface AudioLayerProperties extends AuditoryLayerProperties {
}
export default class AudioLayer extends AuditoryLayer {
    settings: AudioLayerSettings;
    properties: AudioLayerProperties;
    static type: string;
    constructor(parent: any, properties: AudioLayerProperties | undefined, settings: AudioLayerSettings);
    static get isAsset(): boolean;
    static get defaultSettings(): Partial<AudioLayerSettings>;
    static get defaultProperties(): Partial<AudioLayerProperties>;
}
