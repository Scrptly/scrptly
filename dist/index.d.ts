import type { RenderOptions } from './renderer.js';
import type { Time, Id, Easing, Action, AddLayerOptions } from './types.js';
export type { Time, Id, Easing, Action, AddLayerOptions };
import BaseLayer from './layers/BaseLayer.js';
export type { BaseLayerProperties, BaseLayerSettings } from './layers/BaseLayer.js';
import FolderLayer from './layers/FolderLayer.js';
export type { FolderLayerProperties, FolderLayerSettings } from './layers/FolderLayer.js';
import TextLayer from './layers/TextLayer.js';
export type { TextLayerProperties, TextLayerSettings } from './layers/TextLayer.js';
import CaptionsLayer from './layers/CaptionsLayer.js';
export type { CaptionsLayerProperties, CaptionsLayerSettings } from './layers/CaptionsLayer.js';
import ImageLayer from './layers/ImageLayer.js';
export type { ImageLayerProperties, ImageLayerSettings } from './layers/ImageLayer.js';
import VideoLayer from './layers/VideoLayer.js';
export type { VideoLayerProperties, VideoLayerSettings } from './layers/VideoLayer.js';
import AudioLayer from './layers/AudioLayer.js';
export type { AudioLayerProperties, AudioLayerSettings } from './layers/AudioLayer.js';
import TTSLayer from './layers/TTSLayer.js';
export type { TTSLayerProperties, TTSLayerSettings } from './layers/TTSLayer.js';
export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioLayer, TTSLayer };
export { default as TextualLayer } from './layers/TextualLayer.js';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer.js';
export { default as AuditoryLayer } from './layers/AuditoryLayer.js';
export type { AuditoryLayerProperties, AuditoryLayerSettings } from './layers/AuditoryLayer.js';
export { default as MediaLayer } from './layers/MediaLayer.js';
export type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer.js';
export { default as VisualLayer } from './layers/VisualLayer.js';
export type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer.js';
export type ProjectSettings = {
    size?: {
        width: number;
        height: number;
    };
    frameRate?: number | string;
    backgroundColor?: string;
    defaults?: {
        easing?: Easing;
        fontFamily?: string;
    };
};
export type ScrptlySettings = {
    apiKey: string | false;
    apiEndpoint?: string;
};
interface RenderCtx {
    result?: any;
}
export default class Scrptly {
    settings: ProjectSettings;
    layers: BaseLayer[];
    flow: Action[];
    private _flowPointer;
    prepareAssetsTask: any;
    renderVideoTask: any;
    renderCtx: RenderCtx;
    constructor(settings?: ProjectSettings);
    static get defaultSettings(): ProjectSettings;
    static setApiSettings(settings: ScrptlySettings): void;
    pushAction(action: Action): void;
    wait(time: Time): this;
    parallel(funcs: Array<() => Action>, settings?: any): void;
    addLayer<T extends BaseLayer>(LayerClass: new (parent: Scrptly, properties?: any, settings?: any) => T, properties?: any, settings?: any, options?: AddLayerOptions): T;
    addFolder(properties?: any, settings?: any, options?: AddLayerOptions): FolderLayer;
    addText(properties?: any, settings?: any, options?: AddLayerOptions): TextLayer;
    addImage(properties?: any, settings?: any, options?: AddLayerOptions): ImageLayer;
    addVideo(properties?: any, settings?: any, options?: AddLayerOptions): VideoLayer;
    addAudio(properties?: any, settings?: any, options?: AddLayerOptions): AudioLayer;
    addCaptions(properties?: any, settings?: any, options?: AddLayerOptions): CaptionsLayer;
    addTTS(properties?: any, settings?: any, options?: AddLayerOptions): TTSLayer;
    apiCall(endpoint: string, options?: any): Promise<any>;
    info(): Promise<any>;
    prepareAssets(actions?: Action[]): Promise<boolean>;
    renderVideo(options?: RenderOptions): Promise<any>;
}
