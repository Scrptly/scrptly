import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer.js';
export type CaptionsLayerSettings = VisualLayerSettings & {
    source: string;
    sourceType?: 'layer' | 'subtitles';
};
export type CaptionsLayerProperties = VisualLayerProperties;
export default class CaptionsLayer extends VisualLayer {
    source: string;
    sourceType: 'layer' | 'subtitles';
    static type: string;
    settings: CaptionsLayerSettings;
    properties: CaptionsLayerProperties;
    constructor(parent: any, properties: CaptionsLayerProperties | undefined, settings: CaptionsLayerSettings);
    static get defaultSettings(): Partial<CaptionsLayerSettings>;
    static get defaultProperties(): Partial<CaptionsLayerProperties>;
}
