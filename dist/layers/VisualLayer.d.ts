import BaseLayer, { BaseLayerSettings, BaseLayerProperties } from './BaseLayer.js';
import type { Time, Easing } from '../types.js';
export interface VisualLayerProperties extends BaseLayerProperties {
    visible?: boolean;
    opacity?: number;
    blendMode?: string;
    position?: [number, number] | [number, number, number];
    scale?: number | [number, number] | [number, number, number];
    rotation?: number | [number, number, number];
    anchor?: [number, number] | [number, number, number];
    backgroundColor?: string;
    borderWidth?: number | [number, number, number, number];
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: number | [number, number, number, number];
    boxShadow?: boolean;
    boxShadowBlur?: number;
    boxShadowOffset?: [number, number];
    boxShadowSpread?: number;
    boxShadowColor?: string;
    outlineWidth?: number;
    outlineStyle?: string;
    outlineColor?: string;
    outlineOffset?: number;
    filterBlur?: number;
    filterBrightness?: number;
    filterContrast?: number;
    filterGrayscale?: number;
    filterSepia?: number;
    filterInvert?: number;
    filterHueRotate?: number;
    filterSaturate?: number;
    perspective?: number;
}
export interface VisualLayerSettings extends BaseLayerSettings {
}
export default class VisualLayer extends BaseLayer {
    properties: VisualLayerProperties;
    static type: string;
    settings: VisualLayerSettings;
    constructor(parent: any, properties: VisualLayerProperties | undefined, settings: VisualLayerSettings);
    static get defaultSettings(): Partial<VisualLayerSettings>;
    static get defaultProperties(): Partial<VisualLayerProperties>;
    static get propertiesDefinition(): {
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
    show(): this;
    hide(): this;
    toggle(): this;
    fadeIn(duration?: Time, easing?: Easing, wait?: boolean): this;
    fadeOut(duration?: Time, easing?: Easing, wait?: boolean): this;
}
