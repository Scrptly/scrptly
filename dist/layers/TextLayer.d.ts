import TextualLayer, { TextualLayerProperties, TextualLayerSettings } from './TextualLayer.js';
export type TextLayerProperties = TextualLayerProperties & {
    text?: string;
};
export type TextLayerSettings = TextualLayerSettings;
export default class TextLayer extends TextualLayer {
    static type: string;
    properties: TextLayerProperties;
    settings: TextLayerSettings;
    constructor(parent: any, properties?: TextLayerProperties, settings?: TextLayerSettings);
    static get defaultSettings(): Partial<TextLayerSettings>;
    static get defaultProperties(): Partial<TextLayerProperties>;
    static get propertiesDefinition(): {
        text: {
            cssProperty: boolean;
            default: string;
            animatable: boolean;
        };
        fontSize: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        fontFamily: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        fontWeight: {
            cssProperty: string;
            default: number;
            animatable: boolean;
        };
        fontStyle: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        fontStretch: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        color: {
            default: string;
            animatable: boolean;
        };
        textAlign: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        verticalAlign: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        padding: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        textStroke: {
            default: boolean;
            animatable: boolean;
        };
        textStrokeWidth: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        textStrokeColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        textShadow: {
            default: boolean;
            animatable: boolean;
        };
        textShadowColor: {
            cssProperty: string;
            default: string;
            animatable: boolean;
        };
        textShadowOffset: {
            cssProperty: string;
            units: string[];
            default: number[];
            animatable: boolean;
        };
        textShadowBlur: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        letterSpacing: {
            cssProperty: string;
            units: string[];
            default: string;
            animatable: boolean;
        };
        lineHeight: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        textTransform: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        textDecoration: {
            cssProperty: string;
            enum: string[];
            default: string;
            animatable: boolean;
        };
        wordSpacing: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        textIndent: {
            cssProperty: string;
            units: string[];
            default: number;
            animatable: boolean;
        };
        direction: {
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
        outerBorder: {
            default: boolean;
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
