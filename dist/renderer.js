import { EventSource } from 'eventsource';
export default class Renderer {
    scrptly;
    options = {};
    flow;
    settings;
    constructor(scrptly, options = {}, settings, flow) {
        this.scrptly = scrptly;
        Object.assign(this.options, options);
        this.flow = flow;
        this.settings = settings;
    }
    async listenToEvents(url) {
        await new Promise((resolve, reject) => {
            const sse = new EventSource(url);
            sse.onmessage = (event) => {
                let { command, data } = JSON.parse(event.data);
                switch (command) {
                    case 'log':
                        this.scrptly.renderVideoTask.output = data.message;
                        break;
                    case 'progress':
                        this.scrptly.renderVideoTask.title = 'Rendering video — ' + data.progress.toFixed(1) + '%';
                        break;
                    case 'warn':
                        this.scrptly.renderVideoTask.report(data.warn);
                        break;
                    case 'fail':
                        reject(new Error(data.error));
                        sse.close();
                        break;
                    case 'complete':
                        this.scrptly.renderVideoTask.title = 'Render video';
                        this.scrptly.renderVideoTask.ctx.result = data.renderInfo;
                        this.scrptly.renderVideoTask.output = 'Render successful! Video URL: ' + data.renderInfo.videoUrl;
                        resolve(data);
                        sse.close();
                        break;
                    case 'close':
                        sse.close();
                        break;
                    default:
                        console.warn('Unknown command:', command, 'Data:', data);
                }
            };
            sse.onerror = (err) => {
                this.options.verbose && console.error('SSE error:', err);
                reject(new Error('SSE error: ' + String(err)));
            };
        });
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
            await this.listenToEvents(response.eventsUrl);
            return response;
        }
        else {
            throw new Error(`Render failed: ${response.error}`);
        }
    }
}
