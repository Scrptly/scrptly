import AssetUploader from './assetUploader.js';
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
const scriptlySettings = {
    apiKey: false,
    apiEndpoint: 'https://api.scrptly.com/',
};
export default class Scrptly {
    constructor(settings = {}) {
        this.layers = [];
        this.flow = [];
        this._flowPointer = this.flow;
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
            defaultEasing: 'easeInOut',
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
    generate() {
        return this.flow;
    }
    addLayer(LayerClass, properties = {}, settings = {}, options = {}) {
        const layer = new LayerClass(this, properties, settings);
        this.layers.push(layer);
        this.pushAction({ statement: 'addLayer', id: layer.id, type: LayerClass.type, settings, properties, options });
        return layer;
    }
    addFolder(properties, settings, options) {
        return this.addLayer(FolderLayer, properties, settings, options);
    }
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
    async prepareAssets() {
        for (let layer_ of this.layers) {
            let layer = layer_;
            if (layer.constructor.isAsset && layer.settings.sourceType == 'file') {
                let asset = new AssetUploader(this, layer.settings.source, layer.constructor.type);
                let response = await asset.uploadAsset();
                layer.settings.source = response.url;
                layer.settings.sourceType = 'asset';
            }
        }
    }
    async renderVideo(options = {}) {
        // TODO upload media files
        await this.prepareAssets();
        const response = await this.apiCall('renderVideo', {
            method: 'POST',
            body: JSON.stringify({
                flow: this.generate(),
                settings: this.settings,
            }),
        });
        return response;
    }
}
