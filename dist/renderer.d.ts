import type { ProjectSettings } from './index.js';
import type { Action } from './types.js';
import type Scrptly from './index.js';
export type RenderOptions = {
    verbose?: boolean;
};
export default class Renderer {
    scrptly: Scrptly;
    options: RenderOptions;
    flow: Action[];
    settings: ProjectSettings;
    constructor(scrptly: Scrptly, options: RenderOptions | undefined, settings: ProjectSettings, flow: Action[]);
    listenToEvents(url: string): Promise<void>;
    render(): Promise<any>;
}
