import {EventSource} from 'eventsource';
import type { ProjectSettings } from './index';
import type { Action } from './types';
import type Scrptly from './index';

export type RenderOptions = {
	verbose?: boolean;
};

export default class Renderer {
	scrptly!: Scrptly;
	options: RenderOptions = {};
	flow: Action[];
	settings: ProjectSettings;
	renderId?: string;
	taskId?: string;
	constructor(scrptly: Scrptly, options:RenderOptions = {}, settings:ProjectSettings, flow: Action[]) {
		this.scrptly = scrptly;
		Object.assign(this.options, options);
		this.flow = flow;
		this.settings = settings;
	}
	async listenToEvents(url: string, mode: 'render' | 'generate' = 'render') {
		if(mode === 'generate') {
			return await new Promise((resolve, reject) => {
				const sse = new EventSource(url);
				sse.onmessage = (event) => {
					try {
						let {command, data} = JSON.parse(event.data);
						switch(command) {
							case 'log':
								this.scrptly.renderVideoTask.output = data.message;
								break;
							case 'progress':
								this.scrptly.renderVideoTask.title = 'Rendering video — '+data.progress.toFixed(1)+'%';
								break;
							case 'warn':
								this.scrptly.renderVideoTask.report(data.warn);
								break;
							case 'fail':
								reject(new Error(data.error));
								sse.close();
								break;
							case 'complete':
								sse.close();
								this.scrptly.renderVideoTask.title = 'Render video';
								this.scrptly.renderVideoTask.output = `Render successful (took ${Math.round(data.renderInfo.info.renderDuration / 1000)}s)!\nVideo URL: ${data.renderInfo.output.video}\nRender Info: ${data.renderInfo.url}`;
								resolve(data.renderInfo);
								break;
							case 'close':
								sse.close();
								break;
							default:
								console.warn('Unknown command:', command, 'Data:', data);
						}
					} catch(e) {
						console.error(e);
					}
				};
				sse.onerror = (err) => {
					this.options.verbose && console.error('SSE error:', err);
					reject(new Error(`Connection to render server lost.${this.renderId?`\nTrack Render status at: https://scrptly.com/render/${this.renderId}` : ''}`));
				};
			});
		} else {
			return await new Promise((resolve, reject) => {
				const sse = new EventSource(url);
				sse.onmessage = (event) => {
					try {
						let {command, data} = JSON.parse(event.data);
						switch(command) {
							case 'log':
								this.scrptly.generateProjectTask.output = data.message;
								break;
							case 'warn':
								this.scrptly.generateProjectTask.report(data.warn);
								break;
							case 'fail':
								reject(new Error(data.error));
								sse.close();
								break;
							case 'complete':
								sse.close();
								this.scrptly.generateProjectTask.title = 'Generate project';
								this.scrptly.generateProjectTask.output = `Project successfully generated (took ${Math.round(data.taskInfo.duration / 1000)}s)!\nProject URL: ${data.taskInfo.projectUrl}`;
								resolve(data.taskInfo);
								break;
							case 'close':
								sse.close();
								break;
							default:
								console.warn('Unknown command:', command, 'Data:', data);
						}
					} catch(e) {
						console.error(e);
					}
				};
				sse.onerror = (err) => {
					this.options.verbose && console.error('SSE error:', err);
					reject(new Error(`Connection to render server lost.`));
				};
			});
		}
	}
	async render() {
		const response = await this.scrptly.apiCall('renderVideo', {
			method: 'POST',
			body: JSON.stringify({
				flow: this.flow,
				settings: this.settings,
			}),
		});
		if(response.success) {
			this.renderId = response.renderId;
			return await this.listenToEvents(response.eventsUrl);
		} else {
			throw new Error(`Render failed: ${response.error}`);
		}
	}
	async generateProject() {
		const response = await this.scrptly.apiCall('generateProject', {
			method: 'POST',
			body: JSON.stringify({
				flow: this.flow,
				settings: this.settings,
			}),
		});
		if(response.success) {
			return await this.listenToEvents(response.eventsUrl);
		} else {
			throw new Error(`Render failed: ${response.error}`);
		}
	}

}