import type { Time, Id, Action } from './types';
import { BaseLayer } from './layers/BaseLayer';
import { FolderLayer } from './layers/FolderLayer';
import { TextLayer } from './layers/TextLayer';
import { ImageLayer } from './layers/ImageLayer';
import { VideoLayer } from './layers/VideoLayer';
import { AudioTrackLayer } from './layers/AudioTrackLayer';
import { TTSLayer } from './layers/TTSLayer';

export { BaseLayer, FolderLayer, TextLayer, ImageLayer, VideoLayer, AudioTrackLayer, TTSLayer };

export type {Time, Id, Action};

export type ProjectSettings = {
	size?: { width: number; height: number };
	frameRate?: number | string;
};

export default class Scrptly {
	settings!: ProjectSettings;

	elements: BaseLayer[] = [];
	timeline?: any;
	linkedLayers: Id[] = [];
	flow: Action[] = [];

	flowPointer: Action[] = this.flow;

	constructor(settings: ProjectSettings = {}) {
		this.settings = {
			size: { width: 1920, height: 1080 },
			frameRate: 30,
			...settings,
		};
	}

	pushAction(action: Action) {
		this.flowPointer.push(action);
	}

	wait(time: Time) {
		this.pushAction({ statement: 'wait', duration: time });
		return this;
	}

	parallel(funcs: Array<() => Action>, settings?: any) {
		let initialPointer = this.flowPointer;
		let actions: Action[][] = [];
		funcs.forEach(fn => {
			this.flowPointer = [];
			actions.push(this.flowPointer);
			fn();
		});
		this.flowPointer = initialPointer;
		this.pushAction({ statement: 'parallel', actions });
		return this;
	}

	generate() {
		return this.flow;
	}

	addLayer<T extends BaseLayer>(
		LayerClass: new (parent: Scrptly, properties?: any, settings?: any) => T,
		properties?: any,
		settings?: any
	) {
		const layer = new LayerClass(this, properties, settings);
		this.elements.push(layer);
		this.pushAction({ statement: 'addLayer', id: layer.id, type: (LayerClass as any).type, settings: settings || {}, properties: properties || {} });
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
	addTTS(properties?: any, settings?: any) {
		return this.addLayer(TTSLayer, properties, settings);
	}
}