import MediaLayer, { MediaLayerSettingsStatic, MediaLayerSettingsDynamic, MediaLayerProperties } from './MediaLayer.js';
import { AuditoryLayerSettings, AuditoryLayerProperties } from './AuditoryLayer.js';
export type VideoLayerSettings = (MediaLayerSettingsStatic | (MediaLayerSettingsDynamic & {
    duration?: number;
    image?: {
        source: string;
        sourceType?: 'url' | 'asset' | 'base64' | 'file';
    } | {
        prompt: string;
        model: 'unsplash' | 'openai' | 'google' | 'falai' | string;
        modelSettings?: any;
        cache?: boolean;
    };
})) & AuditoryLayerSettings;
export type VideoLayerProperties = MediaLayerProperties & AuditoryLayerProperties;
export default class VideoLayer extends MediaLayer {
    static type: string;
    settings: VideoLayerSettings;
    properties: VideoLayerProperties;
    constructor(parent: any, properties: VideoLayerProperties | undefined, settings: VideoLayerSettings);
    static get defaultSettings(): Partial<VideoLayerSettings>;
    static get defaultProperties(): Partial<VideoLayerProperties>;
    static get propertiesDefinition(): {
        fit: {
            default: string;
            enum: string[];
            animatable: boolean;
        };
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
        objectFit: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        visible: {
            default: boolean;
            animatable: boolean;
        };
        opacity: {
            default: number;
            animatable: boolean;
        };
        position: {
            cssProperty: string;
            default: number[];
            animatable: boolean;
        };
        scale: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        rotation: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        anchor: {
            cssProperty: string;
            default: number[];
            animatable: boolean;
        };
        backgroundColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        borderWidth: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        borderStyle: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        borderColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        borderRadius: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        boxShadow: {
            default: boolean;
            animatable: boolean;
        };
        boxShadowBlur: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        boxShadowOffset: {
            cssProperty: string;
            units: string[];
            default: number[];
            animatable: boolean;
        };
        boxShadowSpread: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        boxShadowColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        outlineWidth: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        outlineStyle: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        outlineColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        outlineOffset: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        filterBlur: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        filterBrightness: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        filterContrast: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        filterGrayscale: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        filterSepia: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        filterInvert: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        filterHueRotate: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        filterSaturate: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        blendMode: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        perspective: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
    };
}
