import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer.js';
export interface AudioLayerProperties extends BaseLayerProperties {
    volume?: number;
    pan?: number;
    pitch?: number;
    mute?: boolean;
}
export interface AudioLayerSettings extends BaseLayerSettings {
}
export default class AudioLayer extends BaseLayer {
    properties: AudioLayerProperties;
    static type: string;
    settings: AudioLayerSettings;
    constructor(parent: any, properties: AudioLayerProperties | undefined, settings: AudioLayerSettings);
    static get defaultSettings(): Partial<AudioLayerSettings>;
    static get defaultProperties(): Partial<AudioLayerProperties>;
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
