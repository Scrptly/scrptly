import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer.js';
export type MediaLayerSettings = (VisualLayerSettings & {
    source: string;
    sourceType?: 'url' | 'asset' | 'base64' | 'file';
}) | (VisualLayerSettings & {
    prompt: string;
    model?: 'auto' | 'default' | 'unsplash' | 'openai' | 'google' | 'falai' | string;
});
export type MediaLayerProperties = VisualLayerProperties & {
    objectFit?: string;
};
export default class MediaLayer extends VisualLayer {
    static type: string;
    settings: MediaLayerSettings;
    properties: MediaLayerProperties;
    constructor(parent: any, properties: MediaLayerProperties | undefined, settings: MediaLayerSettings);
    static get isAsset(): boolean;
    static get defaultSettings(): Partial<MediaLayerSettings>;
    static get defaultProperties(): Partial<MediaLayerProperties>;
    static get propertiesDefinition(): {
        fit: {
            enum: string[];
            default: string;
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
