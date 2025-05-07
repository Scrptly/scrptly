import type { Time, Id, Action } from './types';
import { BaseLayer } from './layers/BaseLayer';
import { FolderLayer } from './layers/FolderLayer';
import { TextLayer } from './layers/TextLayer';
import { ImageLayer } from './layers/ImageLayer';
import { VideoLayer } from './layers/VideoLayer';
import { AudioTrackLayer } from './layers/AudioTrackLayer';
import { TTSLayer } from './layers/TTSLayer';

type ScrptlySettings = {
	size?: { width: number; height: number };
	frameRate?: number | string;
};

export default class Scrptly {
	settings!: ScrptlySettings;

	elements: BaseLayer[] = [];
	timeline?: any;
	linkedLayers: Id[] = [];
	flow: Action[] = [];

	flowPointer: Action[] = this.flow;

	constructor(settings: ScrptlySettings = {}) {
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
		LayerClass: new (parent: Scrptly, settings?: any) => T,
		settings?: any
	) {
		const layer = new LayerClass(this, settings);
		this.elements.push(layer);
		this.pushAction({ statement: 'addLayer', id: layer.id, type: (LayerClass as any).type, settings: layer.settings || {} });
		return layer;
	}

	addFolder(settings?: any) {
		return this.addLayer(FolderLayer, settings);
	}
	addText(settings?: any) {
		return this.addLayer(TextLayer, settings);
	}
	addImage(settings?: any) {
		return this.addLayer(ImageLayer, settings);
	}
	addVideo(settings?: any) {
		return this.addLayer(VideoLayer, settings);
	}
	addAudio(settings?: any) {
		return this.addLayer(AudioTrackLayer, settings);
	}
	addTTS(settings?: any) {
		return this.addLayer(TTSLayer, settings);
	}
}