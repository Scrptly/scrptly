import {EventSource} from 'eventsource';
import type Scrptly from './index';
import { AiAgentParameters } from './index';

export type AgentOptions = {
	verbose?: boolean;
};

export default class Agent {
	scrptly!: Scrptly;
	options!: AgentOptions;
	parameters!: AiAgentParameters;
	projectId?: string;
	projectUrl?: string;
	taskId?: string;
	task: any;
	constructor(scrptly: Scrptly, parameters: AiAgentParameters, options:AgentOptions) {
		this.scrptly = scrptly;
		this.options = options;
		this.parameters = parameters;
	}
	async listenToEvents(url: string) {
		return await new Promise((resolve, reject) => {
			const sse = new EventSource(url);
			sse.onmessage = (event) => {
				try {
					let {command, data} = JSON.parse(event.data);
					switch(command) {
						case 'log':
							this.task.output = data;
							break;
						case 'title':
							this.task.title = data;
							break;
						case 'progress':
							this.task.output = 'Rendering video — '+(data || 0).toFixed(1)+'%';
							break;
						case 'warn':
							this.options.verbose && console.warn('\n⚠️ '+data+'\n');
							break;
						case 'error':
							reject(new Error(data));
							sse.close();
							break;
						case 'complete':
							sse.close();
							this.task.title = 'Generare AI Video';
							this.task.output = `Render successful (took ${Math.round(data.renderInfo.info.renderDuration / 1000)}s)!\nVideo URL: ${data.renderInfo.output.video}\nRender Info: ${data.renderInfo.url}`;
							resolve(data.renderInfo);
							break;
						case 'close':
							sse.close();
							break;
						default:
							console.warn('Unknown command:', command, 'Data:', data);
					}
				} catch(e) {
					this.options.verbose && console.log('\n⚠️ '+String(e)+'\n');
				}
			};
			sse.onerror = (err) => {
				this.options.verbose && console.error('SSE error:', err);
				reject(new Error(`Connection to server lost.`));
			};
		});
	}
	async generateAiVideo(ctx: any) {
		return this.scrptly.generateAiVideoTask.newListr([
			{
				title: 'Creating AI Project',
				task: async (ctx: any, task: any) => {
					const response = await this.scrptly.apiCall('generateAiVideo', {
						method: 'POST',
						body: JSON.stringify({
							prompt: this.parameters.prompt,
							context: this.parameters.context,
							approveUpTo: this.parameters.approveUpTo,
						}),
					});
					if(response.success) {
						this.projectId = response.projectId;
						this.projectUrl = response.projectUrl;
						task.title = `Created AI Project (ID: ${this.projectId})`;
						task.output = `Project URL: ${this.projectUrl}`;
						ctx.eventsUrl = response.eventsUrl;
					} else {
						throw new Error(`Project creation failed: ${response.error}`);
					}
				},
				rendererOptions: {
					persistentOutput: true,
				},
			},
			{
				title: 'Generating AI Video',
				task: async (ctx: any, task: any) => {
					this.task = task;
					ctx.result = await this.listenToEvents(ctx.eventsUrl);
				},
				rendererOptions: {
					persistentOutput: true,
				},
			}
		], {
			rendererOptions: {collapse: false}
		});
	}

}