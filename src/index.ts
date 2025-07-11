import AssetUploader from './assetUploader';
import Renderer from './renderer';
import type {RenderOptions} from './renderer';
import { Listr, SilentRenderer } from 'listr2';

import type { Time, Id, Easing, Action, AddLayerOptions } from './types';
export type { Time, Id, Easing, Action, AddLayerOptions };

import BaseLayer from './layers/BaseLayer';
import type { BaseLayerProperties, BaseLayerSettings } from './layers/BaseLayer';
export type { BaseLayerProperties, BaseLayerSettings };

import FolderLayer from './layers/FolderLayer';
import type { FolderLayerProperties, FolderLayerSettings } from './layers/FolderLayer';
export type { FolderLayerProperties, FolderLayerSettings };

import TextLayer from './layers/TextLayer';
import type { TextLayerProperties, TextLayerSettings } from './layers/TextLayer';
export type { TextLayerProperties, TextLayerSettings };

import CaptionsLayer from './layers/CaptionsLayer';
import type { CaptionsLayerProperties, CaptionsLayerSettings } from './layers/CaptionsLayer';
export type { CaptionsLayerProperties, CaptionsLayerSettings };

import ImageLayer from './layers/ImageLayer';
import type { ImageLayerProperties, ImageLayerSettings } from './layers/ImageLayer';
export type { ImageLayerProperties, ImageLayerSettings };

import VideoLayer from './layers/VideoLayer';
import type { VideoLayerProperties, VideoLayerSettings } from './layers/VideoLayer';
export type { VideoLayerProperties, VideoLayerSettings };

import AudioLayer from './layers/AudioLayer';
import type { AudioLayerProperties, AudioLayerSettings } from './layers/AudioLayer';
export type { AudioLayerProperties, AudioLayerSettings };

import TTSLayer from './layers/TTSLayer';
import type { TTSLayerProperties, TTSLayerSettings } from './layers/TTSLayer';
export type { TTSLayerProperties, TTSLayerSettings };

export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioLayer, TTSLayer };

export {default as TextualLayer} from './layers/TextualLayer';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer';

export {default as AuditoryLayer} from './layers/AuditoryLayer';
export type { AuditoryLayerProperties, AuditoryLayerSettings } from './layers/AuditoryLayer';

export {default as MediaLayer} from './layers/MediaLayer';
import MediaLayer from './layers/MediaLayer';
import type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer';
export type { MediaLayerProperties, MediaLayerSettings };

export {default as VisualLayer} from './layers/VisualLayer';
import type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer';
export type { VisualLayerProperties, VisualLayerSettings };


export type ProjectSettings = {
	size?: { width: number; height: number };
	frameRate?: number | string;
	backgroundColor?: string;
	defaults?: {
		easing?: Easing;
		fontFamily?: string;
		cacheIntegrations?: boolean; // whether to cache API calls to third party integrations like TTS, AI generators, etc.
	}
};
export type ScrptlySettings = {
	apiKey: string | false;
	apiEndpoint?: string
};

interface RenderCtx {
	result?: any;
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
	prepareAssetsTask: any = null;
	renderVideoTask: any = null;
	generateProjectTask: any = null;
	renderCtx: RenderCtx = {};

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
			defaults: {
				easing: 'easeInOut',
				fontFamily: 'Noto Sans',
				cacheIntegrations: true,
			}
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

	addLayer<T extends BaseLayer>(
		LayerClass: new (parent: Scrptly, properties?: any, settings?: any) => T,
		properties: Record<string, any> = {},
		settings: Record<string, any> = {},
		options: AddLayerOptions = {}
	) {
		const layer = new LayerClass(this, properties, settings);
		this.layers.push(layer);
		this.pushAction({ statement: 'addLayer', id: layer.id, type: (LayerClass as any).type, settings, properties, options });
		return layer;
	}

	/*addFolder(properties?: Record<string, any>, settings?: Record<string, any>, options?: AddLayerOptions) {
		return this.addLayer(FolderLayer, properties, settings, options);
	}*/
	addText(properties?: TextLayerProperties, settings?: TextLayerSettings, options?: AddLayerOptions) {
		return this.addLayer(TextLayer, properties, settings, options);
	}
	addImage(properties?: ImageLayerProperties, settings?: ImageLayerSettings, options?: AddLayerOptions) {
		return this.addLayer(ImageLayer, properties, settings, options);
	}
	addVideo(properties?: VideoLayerProperties, settings?: VideoLayerSettings, options?: AddLayerOptions) {
		return this.addLayer(VideoLayer, properties, settings, options);
	}
	addAudio(properties?: AudioLayerProperties, settings?: AudioLayerSettings, options?: AddLayerOptions) {
		return this.addLayer(AudioLayer, properties, settings, options);
	}
	addCaptions(properties?: CaptionsLayerProperties, settings?: CaptionsLayerSettings, options?: AddLayerOptions) {
		settings
		return this.addLayer(CaptionsLayer, properties, settings, options);
	}
	addTTS(properties?: TTSLayerProperties, settings?: TTSLayerSettings, options?: AddLayerOptions) {
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

	async prepareAssets(actions: Action[] = this.flow) {
		for(let action of actions) {
			if(action.statement === 'addLayer') {
				let layer: any = this.layers.find(l => l.id === action.id) as any;
				if(layer && layer.constructor.isAsset && 'source' in layer.settings && layer.settings.sourceType=='file') {
					this.prepareAssetsTask.output = `Uploading ${layer.settings.source}...`;
					let asset = new AssetUploader(this, layer.settings.source, layer.constructor.type);
					let response = await asset.uploadAsset();
					layer.settings.source = response.url;
					layer.settings.sourceType = 'asset';

					action.settings.source = response.url;
					action.settings.sourceType = 'asset';

					// Prepare image assets for video layers
					if(action.type === 'video' && layer.settings?.image?.source && layer.settings.image.sourceType === 'file') {
						this.prepareAssetsTask.output = `Uploading ${layer.settings.image.source}...`;
						let asset = new AssetUploader(this, layer.settings.image.source, (layer.constructor as typeof MediaLayer).type);
						let response = await asset.uploadAsset();
						layer.settings.image.source = response.url;
						layer.settings.image.sourceType = 'asset';

						action.settings.image.source = response.url;
						action.settings.image.sourceType = 'asset';
					}
				}
			} else if(action.statement==='parallel') {
				for(let subActions of action.actions) {
					await this.prepareAssets(subActions);
				}
			}
		}
		return true;
	}
	
	async renderVideo(options:RenderOptions = {}) {
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
			renderer: options.verbose===false ? SilentRenderer : 'default',
			ctx: this.renderCtx
		});
		await tasks.run();
		return tasks.ctx.result;
	}


	async generateProject(options:RenderOptions = {}) {
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
			renderer: options.verbose===false ? SilentRenderer : 'default',
			ctx: this.renderCtx
		});
		await tasks.run();
		return tasks.ctx.result;
	}
}