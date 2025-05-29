import EventSource from 'eventsource';
export default class Renderer {
    scrptly;
    options = {
        verbose: true
    };
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
                        if (this.options.verbose) {
                            console.log('Log:', data);
                        }
                        break;
                    case 'error':
                        console.error('Error:', data);
                        reject(new Error(data));
                        sse.close();
                        break;
                    case 'complete':
                        console.log('Render complete:', data);
                        resolve(data);
                        sse.close();
                        break;
                    default:
                        console.warn('Unknown command:', command, 'Data:', data);
                }
            };
            sse.onerror = (err) => {
                this.options.verbose && console.error('SSE error:', err);
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
