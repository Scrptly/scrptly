import type { RenderOptions } from './renderer';
import type { Time, Id, Easing, Action, AddLayerOptions } from './types';
export type { Time, Id, Easing, Action, AddLayerOptions };
import BaseLayer from './layers/BaseLayer';
export type { BaseLayerProperties, BaseLayerSettings } from './layers/BaseLayer';
import FolderLayer from './layers/FolderLayer';
export type { FolderLayerProperties, FolderLayerSettings } from './layers/FolderLayer';
import TextLayer from './layers/TextLayer';
export type { TextLayerProperties, TextLayerSettings } from './layers/TextLayer';
import CaptionsLayer from './layers/CaptionsLayer';
export type { CaptionsLayerProperties, CaptionsLayerSettings } from './layers/CaptionsLayer';
import ImageLayer from './layers/ImageLayer';
export type { ImageLayerProperties, ImageLayerSettings } from './layers/ImageLayer';
import VideoLayer from './layers/VideoLayer';
export type { VideoLayerProperties, VideoLayerSettings } from './layers/VideoLayer';
import AudioLayer from './layers/AudioLayer';
export type { AudioLayerProperties, AudioLayerSettings } from './layers/AudioLayer';
import TTSLayer from './layers/TTSLayer';
export type { TTSLayerProperties, TTSLayerSettings } from './layers/TTSLayer';
export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioLayer, TTSLayer };
export { default as TextualLayer } from './layers/TextualLayer';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer';
export { default as AuditoryLayer } from './layers/AuditoryLayer';
export type { AuditoryLayerProperties, AuditoryLayerSettings } from './layers/AuditoryLayer';
export { default as MediaLayer } from './layers/MediaLayer';
export type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer';
export { default as VisualLayer } from './layers/VisualLayer';
export type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer';
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
export default class Scrptly {
    settings: ProjectSettings;
    layers: BaseLayer[];
    flow: Action[];
    private _flowPointer;
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
