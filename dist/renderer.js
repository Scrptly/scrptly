import { EventSource } from 'eventsource';
export default class Renderer {
    scrptly;
    options = {};
    flow;
    settings;
    renderId;
    constructor(scrptly, options = {}, settings, flow) {
        this.scrptly = scrptly;
        Object.assign(this.options, options);
        this.flow = flow;
        this.settings = settings;
    }
    async listenToEvents(url) {
        return await new Promise((resolve, reject) => {
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
            };
            sse.onerror = (err) => {
                this.options.verbose && console.error('SSE error:', err);
                reject(new Error(`Connection to renderer server lost.${this.renderId ? `\nTrack Render status at: https://scrptly.com/render/${this.renderId}` : ''}`));
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
            this.renderId = response.renderId;
            return await this.listenToEvents(response.eventsUrl);
        }
        else {
            throw new Error(`Render failed: ${response.error}`);
        }
    }
}
