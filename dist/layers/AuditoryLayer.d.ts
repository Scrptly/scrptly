import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer.js';
export type AuditoryLayerProperties = BaseLayerProperties & {
    volume?: number;
    pan?: number;
    pitch?: number;
    mute?: boolean;
};
export type AuditoryLayerSettings = BaseLayerSettings;
export default class AuditoryLayer extends BaseLayer {
    static type: string;
    properties: AuditoryLayerProperties;
    settings: AuditoryLayerSettings;
    constructor(parent: any, properties: AuditoryLayerProperties | undefined, settings: AuditoryLayerSettings);
    static get defaultSettings(): Partial<AuditoryLayerSettings>;
    static get defaultProperties(): Partial<AuditoryLayerProperties>;
    static get propertiesDefinition(): {
        volume: {
            default: number;
            animatable: boolean;
        };
        pan: {
            default: number;
            animatable: boolean;
        };
        pitch: {
            default: number;
            animatable: boolean;
        };
        mute: {
            default: boolean;
            animatable: boolean;
        };
    };
}
