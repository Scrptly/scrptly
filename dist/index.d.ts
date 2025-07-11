import type { RenderOptions } from './renderer.js';
import type { Time, Id, Easing, Action, AddLayerOptions } from './types.js';
export type { Time, Id, Easing, Action, AddLayerOptions };
import BaseLayer from './layers/BaseLayer.js';
import type { BaseLayerProperties, BaseLayerSettings } from './layers/BaseLayer.js';
export type { BaseLayerProperties, BaseLayerSettings };
import FolderLayer from './layers/FolderLayer.js';
import type { FolderLayerProperties, FolderLayerSettings } from './layers/FolderLayer.js';
export type { FolderLayerProperties, FolderLayerSettings };
import TextLayer from './layers/TextLayer.js';
import type { TextLayerProperties, TextLayerSettings } from './layers/TextLayer.js';
export type { TextLayerProperties, TextLayerSettings };
import CaptionsLayer from './layers/CaptionsLayer.js';
import type { CaptionsLayerProperties, CaptionsLayerSettings } from './layers/CaptionsLayer.js';
export type { CaptionsLayerProperties, CaptionsLayerSettings };
import ImageLayer from './layers/ImageLayer.js';
import type { ImageLayerProperties, ImageLayerSettings } from './layers/ImageLayer.js';
export type { ImageLayerProperties, ImageLayerSettings };
import VideoLayer from './layers/VideoLayer.js';
import type { VideoLayerProperties, VideoLayerSettings } from './layers/VideoLayer.js';
export type { VideoLayerProperties, VideoLayerSettings };
import AudioLayer from './layers/AudioLayer.js';
import type { AudioLayerProperties, AudioLayerSettings } from './layers/AudioLayer.js';
export type { AudioLayerProperties, AudioLayerSettings };
import TTSLayer from './layers/TTSLayer.js';
import type { TTSLayerProperties, TTSLayerSettings } from './layers/TTSLayer.js';
export type { TTSLayerProperties, TTSLayerSettings };
export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioLayer, TTSLayer };
export { default as TextualLayer } from './layers/TextualLayer.js';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer.js';
export { default as AuditoryLayer } from './layers/AuditoryLayer.js';
export type { AuditoryLayerProperties, AuditoryLayerSettings } from './layers/AuditoryLayer.js';
export { default as MediaLayer } from './layers/MediaLayer.js';
import type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer.js';
export type { MediaLayerProperties, MediaLayerSettings };
export { default as VisualLayer } from './layers/VisualLayer.js';
import type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer.js';
export type { VisualLayerProperties, VisualLayerSettings };
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
        cacheIntegrations?: boolean;
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
    generateProjectTask: any;
    renderCtx: RenderCtx;
    constructor(settings?: ProjectSettings);
    static get defaultSettings(): ProjectSettings;
    static setApiSettings(settings: ScrptlySettings): void;
    pushAction(action: Action): void;
    wait(time: Time): this;
    parallel(funcs: Array<() => Action>, settings?: any): void;
    addLayer<T extends BaseLayer>(LayerClass: new (parent: Scrptly, properties?: any, settings?: any) => T, properties?: Record<string, any>, settings?: Record<string, any>, options?: AddLayerOptions): T;
    addText(properties?: TextLayerProperties, settings?: TextLayerSettings, options?: AddLayerOptions): TextLayer;
    addImage(properties?: ImageLayerProperties, settings?: ImageLayerSettings, options?: AddLayerOptions): ImageLayer;
    addVideo(properties?: VideoLayerProperties, settings?: VideoLayerSettings, options?: AddLayerOptions): VideoLayer;
    addAudio(properties?: AudioLayerProperties, settings?: AudioLayerSettings, options?: AddLayerOptions): AudioLayer;
    addCaptions(properties?: CaptionsLayerProperties, settings?: CaptionsLayerSettings, options?: AddLayerOptions): CaptionsLayer;
    addTTS(properties?: TTSLayerProperties, settings?: TTSLayerSettings, options?: AddLayerOptions): TTSLayer;
    apiCall(endpoint: string, options?: any): Promise<any>;
    info(): Promise<any>;
    prepareAssets(actions?: Action[]): Promise<boolean>;
    renderVideo(options?: RenderOptions): Promise<any>;
    generateProject(options?: RenderOptions): Promise<any>;
}
