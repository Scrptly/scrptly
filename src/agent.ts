import {EventSource} from 'eventsource';
import type { ProjectSettings } from './index';
import type { ContextInput } from './types';
import type Scrptly from './index';

export type AgentOptions = {
	approveUpTo: number;
	verbose?: boolean;
};

export default class Agent {
	scrptly!: Scrptly;
	options!: AgentOptions;
	prompt: string;
	context: ContextInput = [];
	projectId?: string;
	projectUrl?: string;
	taskId?: string;
	constructor(scrptly: Scrptly, prompt: string, context: ContextInput = [], options:AgentOptions) {
		this.scrptly = scrptly;
		this.options = options;
		this.prompt = prompt;
		this.context = context;
	}
	async listenToEvents(url: string) {
		return await new Promise((resolve, reject) => {
			const sse = new EventSource(url);
			sse.onmessage = (event) => {
				try {
					let {command, data} = JSON.parse(event.data);
					switch(command) {
						case 'log':
							this.scrptly.generateAiVideoTask.output = data;
							break;
						case 'progress':
							this.scrptly.generateAiVideoTask.title = 'Rendering video — '+data.toFixed(1)+'%';
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
							this.scrptly.generateAiVideoTask.title = 'Generare AI Video';
							this.scrptly.generateAiVideoTask.output = `Render successful (took ${Math.round(data.renderInfo.info.renderDuration / 1000)}s)!\nVideo URL: ${data.renderInfo.output.video}\nRender Info: ${data.renderInfo.url}`;
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
	async generateAiVideo() {
		const response = await this.scrptly.apiCall('generateAiVideo', {
			method: 'POST',
			body: JSON.stringify({
				prompt: this.prompt,
				context: this.context,
				approveUpTo: this.options.approveUpTo,
			}),
		});
		if(response.success) {
			this.projectId = response.projectId;
			this.projectUrl = response.projectUrl;
			this.scrptly.createAiProjectTask.title = `Created AI Project (ID: ${this.projectId})`;
			this.scrptly.createAiProjectTask.output = `Project URL: ${this.projectUrl}`;
			return await this.listenToEvents(response.eventsUrl);
		} else {
			throw new Error(`Render failed: ${response.error}`);
		}
	}

}