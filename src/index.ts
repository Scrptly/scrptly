import type { Time, Id, Easing, Action, AddLayerOptions } from './types';
export type { Time, Id, Easing, Action, AddLayerOptions };

import AssetUploader from './assetUploader';

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

export {default as TextualLayer} from './layers/TextualLayer';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer';
export {default as AuditoryLayer} from './layers/AuditoryLayer';
export type { AuditoryLayerProperties, AuditoryLayerSettings } from './layers/AuditoryLayer';
export {default as MediaLayer} from './layers/MediaLayer';
import MediaLayer from './layers/MediaLayer';
export type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer';
import type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer';
export {default as VisualLayer} from './layers/VisualLayer';
export type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer';


export type ProjectSettings = {
	size?: { width: number; height: number };
	frameRate?: number | string;
	backgroundColor?: string;
	defaultEasing?: Easing;
};
export type ScrptlySettings = {
	apiKey: string | false;
	apiEndpoint?: string
};

const scriptlySettings: ScrptlySettings = {
	apiKey: false,
	apiEndpoint: 'https://api.scrptly.com/',
};

export default class Scrptly {
	settings!: ProjectSettings;

	layers: BaseLayer[] = [];
	flow: Action[] = [];

	private _flowPointer: Action[] = this.flow;

	constructor(settings: ProjectSettings = {}) {
		this.settings = {
			...((this.constructor as typeof Scrptly).defaultSettings),
			...settings,
		};
	}
	static get defaultSettings() : ProjectSettings {
		return {
			size: { width: 1920, height: 1080 },
			frameRate: 30,
			backgroundColor: '#00000000',
			defaultEasing: 'easeInOut',
		};
	}
	static setApiSettings(settings: ScrptlySettings) {
		for (const k of Object.keys(settings) as (keyof ScrptlySettings)[]) {
			scriptlySettings[k] = settings[k]as any;
		}
	}

	// Flow control
	pushAction(action: Action) {
		this._flowPointer.push(action);
	}

	wait(time: Time) {
		this.pushAction({ statement: 'wait', duration: time });
		return this;
	}

	parallel(funcs: Array<() => Action>, settings?: any) {
		let initialPointer = this._flowPointer;
		let actions: Action[][] = [];
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

	addLayer<T extends BaseLayer>(
		LayerClass: new (parent: Scrptly, properties?: any, settings?: any) => T,
		properties: any = {},
		settings: any = {},
		options: AddLayerOptions = {}
	) {
		const layer = new LayerClass(this, properties, settings);
		this.layers.push(layer);
		this.pushAction({ statement: 'addLayer', id: layer.id, type: (LayerClass as any).type, settings, properties, options });
		return layer;
	}

	addFolder(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(FolderLayer, properties, settings, options);
	}
	addText(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(TextLayer, properties, settings, options);
	}
	addImage(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(ImageLayer, properties, settings, options);
	}
	addVideo(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(VideoLayer, properties, settings, options);
	}
	addAudio(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(AudioLayer, properties, settings, options);
	}
	addCaptions(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(CaptionsLayer, properties, settings, options);
	}
	addTTS(properties?: any, settings?: any, options?: AddLayerOptions) {
		return this.addLayer(TTSLayer, properties, settings, options);
	}


	// API calls
	async apiCall(endpoint: string, options: any = {}) {
		if (!scriptlySettings.apiKey) throw new Error('API key not set');
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
		if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);
		return await response.json();

	}

	async info() {
		const response = await this.apiCall('info');
		return response;
	}

	async prepareAssets() {
		for(let layer_ of this.layers) {
			let layer: MediaLayer = layer_ as MediaLayer;
			if((layer.constructor as typeof MediaLayer).isAsset && layer.settings.sourceType=='file') {
				let asset = new AssetUploader(this, layer.settings.source, (layer.constructor as typeof MediaLayer).type);
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