import AssetUploader from './assetUploader.js';
import Renderer from './renderer.js';
import { Listr, SilentRenderer } from 'listr2';
import BaseLayer from './layers/BaseLayer.js';
import FolderLayer from './layers/FolderLayer.js';
import TextLayer from './layers/TextLayer.js';
import CaptionsLayer from './layers/CaptionsLayer.js';
import ImageLayer from './layers/ImageLayer.js';
import VideoLayer from './layers/VideoLayer.js';
import AudioLayer from './layers/AudioLayer.js';
import TTSLayer from './layers/TTSLayer.js';
export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioLayer, TTSLayer };
export { default as TextualLayer } from './layers/TextualLayer.js';
export { default as AuditoryLayer } from './layers/AuditoryLayer.js';
export { default as MediaLayer } from './layers/MediaLayer.js';
export { default as VisualLayer } from './layers/VisualLayer.js';
;
const scriptlySettings = {
    apiKey: false,
    apiEndpoint: 'https://api.scrptly.com/',
};
export default class Scrptly {
    settings;
    layers = [];
    flow = [];
    _flowPointer = this.flow;
    prepareAssetsTask = null;
    renderVideoTask = null;
    generateProjectTask = null;
    renderCtx = {};
    constructor(settings = {}) {
        this.settings = {
            ...(this.constructor.defaultSettings),
            ...settings,
        };
    }
    static get defaultSettings() {
        return {
            size: { width: 1920, height: 1080 },
            frameRate: 30,
            backgroundColor: '#00000000',
            defaults: {
                easing: 'easeInOut',
                fontFamily: 'Noto Sans',
                cacheIntegrations: true,
            }
        };
    }
    static setApiSettings(settings) {
        for (const k of Object.keys(settings)) {
            scriptlySettings[k] = settings[k];
        }
    }
    // Flow control
    pushAction(action) {
        this._flowPointer.push(action);
    }
    wait(time) {
        this.pushAction({ statement: 'wait', duration: time });
        return this;
    }
    parallel(funcs, settings) {
        let initialPointer = this._flowPointer;
        let actions = [];
        funcs.forEach(fn => {
            this._flowPointer = [];
            actions.push(this._flowPointer);
            fn();
        });
        this._flowPointer = initialPointer;
        this.pushAction({ statement: 'parallel', actions });
    }
    addLayer(LayerClass, properties = {}, settings = {}, options = {}) {
        const layer = new LayerClass(this, properties, settings);
        this.layers.push(layer);
        this.pushAction({ statement: 'addLayer', id: layer.id, type: LayerClass.type, settings, properties, options });
        return layer;
    }
    /*addFolder(properties?: Record<string, any>, settings?: Record<string, any>, options?: AddLayerOptions) {
        return this.addLayer(FolderLayer, properties, settings, options);
    }*/
    addText(properties, settings, options) {
        return this.addLayer(TextLayer, properties, settings, options);
    }
    addImage(properties, settings, options) {
        return this.addLayer(ImageLayer, properties, settings, options);
    }
    addVideo(properties, settings, options) {
        return this.addLayer(VideoLayer, properties, settings, options);
    }
    addAudio(properties, settings, options) {
        return this.addLayer(AudioLayer, properties, settings, options);
    }
    addCaptions(properties, settings, options) {
        settings;
        return this.addLayer(CaptionsLayer, properties, settings, options);
    }
    addTTS(properties, settings, options) {
        return this.addLayer(TTSLayer, properties, settings, options);
    }
    // API calls
    async apiCall(endpoint, options = {}) {
        if (!scriptlySettings.apiKey)
            throw new Error('API key not set');
        const url = `${scriptlySettings.apiEndpoint}${endpoint}`;
        const response = await fetch(url, {
            method: options?.method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${scriptlySettings.apiKey}`,
                ...(options?.headers || {}),
            },
            ...options
        });
        if (!response.ok)
            throw new Error(`API call failed: ${response.statusText}`);
        return await response.json();
    }
    async info() {
        const response = await this.apiCall('info');
        return response;
    }
    async prepareAssets(actions = this.flow) {
        for (let action of actions) {
            if (action.statement === 'addLayer') {
                let layer = this.layers.find(l => l.id === action.id);
                if (layer && layer.constructor.isAsset && 'source' in layer.settings && layer.settings.sourceType == 'file') {
                    this.prepareAssetsTask.output = `Uploading ${layer.settings.source}...`;
                    let asset = new AssetUploader(this, layer.settings.source, layer.constructor.type);
                    let response = await asset.uploadAsset();
                    layer.settings.source = response.url;
                    layer.settings.sourceType = 'asset';
                    action.settings.source = response.url;
                    action.settings.sourceType = 'asset';
                    // Prepare image assets for video layers
                    if (action.type === 'video' && layer.settings?.image?.source && layer.settings.image.sourceType === 'file') {
                        this.prepareAssetsTask.output = `Uploading ${layer.settings.image.source}...`;
                        let asset = new AssetUploader(this, layer.settings.image.source, layer.constructor.type);
                        let response = await asset.uploadAsset();
                        layer.settings.image.source = response.url;
                        layer.settings.image.sourceType = 'asset';
                        action.settings.image.source = response.url;
                        action.settings.image.sourceType = 'asset';
                    }
                }
            }
            else if (action.statement === 'parallel') {
                for (let subActions of action.actions) {
                    await this.prepareAssets(subActions);
                }
            }
        }
        return true;
    }
    async renderVideo(options = {}) {
        options = Object.assign({
            verbose: true,
        }, options);
        this.renderCtx = {};
        const tasks = new Listr([
            {
                title: 'Preparing assets',
                task: async (ctx, task) => {
                    this.prepareAssetsTask = task;
                    await this.prepareAssets();
                }
            },
            {
                title: 'Rendering video',
                task: async (ctx, task) => {
                    this.renderVideoTask = task;
                    const renderer = new Renderer(this, options, this.settings, this.flow);
                    ctx.result = await renderer.render();
                },
                rendererOptions: {
                    persistentOutput: true,
                },
            }
        ], {
            renderer: options.verbose === false ? SilentRenderer : 'default',
            ctx: this.renderCtx
        });
        await tasks.run();
        return tasks.ctx.result;
    }
    async generateProject(options = {}) {
        options = Object.assign({
            verbose: true,
        }, options);
        this.renderCtx = {};
        const tasks = new Listr([
            {
                title: 'Preparing assets',
                task: async (ctx, task) => {
                    this.prepareAssetsTask = task;
                    await this.prepareAssets();
                }
            },
            {
                title: 'Generating project',
                task: async (ctx, task) => {
                    this.generateProjectTask = task;
                    const renderer = new Renderer(this, options, this.settings, this.flow);
                    ctx.result = await renderer.generateProject();
                },
                rendererOptions: {
                    persistentOutput: true,
                },
            }
        ], {
            renderer: options.verbose === false ? SilentRenderer : 'default',
            ctx: this.renderCtx
        });
        await tasks.run();
        return tasks.ctx.result;
    }
}
