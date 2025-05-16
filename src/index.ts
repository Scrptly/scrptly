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

import AudioTrackLayer from './layers/AudioTrackLayer';
export type { AudioTrackLayerProperties, AudioTrackLayerSettings } from './layers/AudioTrackLayer';

import TTSLayer from './layers/TTSLayer';
export type { TTSLayerProperties, TTSLayerSettings } from './layers/TTSLayer';

export { BaseLayer, FolderLayer, TextLayer, CaptionsLayer, ImageLayer, VideoLayer, AudioTrackLayer, TTSLayer };

export {default as TextualLayer} from './layers/TextualLayer';
export type { TextualLayerProperties, TextualLayerSettings } from './layers/TextualLayer';
export {default as AudioLayer} from './layers/AudioLayer';
export type { AudioLayerProperties, AudioLayerSettings } from './layers/AudioLayer';
export {default as MediaLayer} from './layers/MediaLayer';
export type { MediaLayerProperties, MediaLayerSettings } from './layers/MediaLayer';
export {default as VisualLayer} from './layers/VisualLayer';
export type { VisualLayerProperties, VisualLayerSettings } from './layers/VisualLayer';


export type ProjectSettings = {
	size?: { width: number; height: number };
	frameRate?: number | string;
	backgroundColor?: string;
	defaultEasing?: Easing;
};

export default class Scrptly {
	settings!: ProjectSettings;

	elements: BaseLayer[] = [];
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
		this.elements.push(layer);
		this.pushAction({ statement: 'addLayer', id: layer.id, type: (LayerClass as any).type, settings, properties, options });
		return layer;
	}

	addFolder(properties?: any, settings?: any) {
		return this.addLayer(FolderLayer, properties, settings);
	}
	addText(properties?: any, settings?: any) {
		return this.addLayer(TextLayer, properties, settings);
	}
	addImage(properties?: any, settings?: any) {
		return this.addLayer(ImageLayer, properties, settings);
	}
	addVideo(properties?: any, settings?: any) {
		return this.addLayer(VideoLayer, properties, settings);
	}
	addAudio(properties?: any, settings?: any) {
		return this.addLayer(AudioTrackLayer, properties, settings);
	}
	addCaptions(properties?: any, settings?: any) {
		return this.addLayer(CaptionsLayer, properties, settings);
	}
	addTTS(properties?: any, settings?: any) {
		return this.addLayer(TTSLayer, properties, settings);
	}
}