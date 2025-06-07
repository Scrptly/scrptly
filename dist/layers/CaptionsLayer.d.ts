import TextualLayer, { TextualLayerProperties, TextualLayerSettings } from './TextualLayer.js';
import { Id } from '../types.js';
export type CaptionsLayerSettings = TextualLayerSettings & {
    source: string;
    sourceType?: 'url' | 'asset' | 'base64' | 'file' | Id | 'other';
    maxCharsPerLine?: number;
    maxLines?: number;
};
export type CaptionsLayerProperties = TextualLayerProperties;
export default class CaptionsLayer extends TextualLayer {
    static type: string;
    settings: CaptionsLayerSettings;
    properties: CaptionsLayerProperties;
    constructor(parent: any, properties: CaptionsLayerProperties | undefined, settings: CaptionsLayerSettings);
    static get isAsset(): boolean;
    static get defaultSettings(): Partial<CaptionsLayerSettings>;
    static get defaultProperties(): Partial<CaptionsLayerProperties>;
}
