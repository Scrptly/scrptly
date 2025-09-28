import { EventSource } from 'eventsource';
export default class Renderer {
    scrptly;
    options = {};
    flow;
    settings;
    renderId;
    taskId;
    constructor(scrptly, options = {}, settings, flow) {
        this.scrptly = scrptly;
        Object.assign(this.options, options);
        this.flow = flow;
        this.settings = settings;
    }
    async listenToEvents(url, mode = 'render') {
        if (mode === 'render') {
            return await new Promise((resolve, reject) => {
                const sse = new EventSource(url);
                sse.onmessage = (event) => {
                    try {
                        let { command, data } = JSON.parse(event.data);
                        switch (command) {
                            case 'log':
                                this.scrptly.renderVideoTask.output = data;
                                break;
                            case 'progress':
                                this.scrptly.renderVideoTask.title = 'Rendering video — ' + data.toFixed(1) + '%';
                                break;
                            case 'warn':
                                this.options.verbose && console.warn('\n⚠️ ' + data + '\n');
                                break;
                            case 'error':
                                reject(new Error(data));
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
                    }
                    catch (e) {
                        this.options.verbose && console.log('\n⚠️ ' + String(e) + '\n');
                    }
                };
                sse.onerror = (err) => {
                    this.options.verbose && console.error('SSE error:', err);
                    reject(new Error(`Connection to render server lost.${this.renderId ? `\nTrack Render status at: https://scrptly.com/render/${this.renderId}` : ''}`));
                };
            });
        }
        else if (mode === 'generate') {
            return await new Promise((resolve, reject) => {
                const sse = new EventSource(url);
                sse.onmessage = (event) => {
                    try {
                        let { command, data } = JSON.parse(event.data);
                        switch (command) {
                            case 'log':
                                this.scrptly.generateProjectTask.output = data;
                                break;
                            case 'warn':
                                this.options.verbose && console.warn('\n⚠️ ' + data + '\n');
                                break;
                            case 'error':
                                reject(new Error(data));
                                sse.close();
                                break;
                            case 'complete':
                                sse.close();
                                this.scrptly.generateProjectTask.title = 'Generate project';
                                this.scrptly.generateProjectTask.output = `Project successfully generated (took ${Math.round(data.taskInfo?.duration / 1000)}s)!\nProject URL: ${data.taskInfo?.projectUrl}`;
                                resolve(data.taskInfo);
                                break;
                            case 'close':
                                sse.close();
                                break;
                            default:
                                console.warn('Unknown command:', command, 'Data:', data);
                        }
                    }
                    catch (e) {
                        this.options.verbose && console.log('\n⚠️ ' + String(e) + '\n');
                    }
                };
                sse.onerror = (err) => {
                    this.options.verbose && console.error('SSE error:', err);
                    reject(new Error(`Connection to render server lost.`));
                };
            });
        }
        else {
            throw new Error(`Unknown mode: ${mode}`);
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
        if (response.success) {
            this.renderId = response.renderId;
            return await this.listenToEvents(response.eventsUrl, 'render');
        }
        else {
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
        if (response.success) {
            return await this.listenToEvents(response.eventsUrl, 'generate');
        }
        else {
            throw new Error(`Render failed: ${response.error}`);
        }
    }
}
