import MediaLayer, { MediaLayerSettings, MediaLayerProperties } from './MediaLayer.js';
export type ImageLayerSettings = MediaLayerSettings;
export type ImageLayerProperties = MediaLayerProperties;
export default class ImageLayer extends MediaLayer {
    static type: string;
    settings: ImageLayerSettings;
    properties: ImageLayerProperties;
    constructor(parent: any, properties: ImageLayerProperties | undefined, settings: ImageLayerSettings);
    static get defaultSettings(): Partial<ImageLayerSettings>;
    static get defaultProperties(): Partial<ImageLayerProperties>;
}
