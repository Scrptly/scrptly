import type { ProjectSettings } from './index';
import type { Action } from './types';
import type Scrptly from './index';
export type RenderOptions = {
    verbose?: boolean;
};
export default class Renderer {
    scrptly: Scrptly;
    options: {
        verbose: boolean;
    };
    flow: Action[];
    settings: ProjectSettings;
    constructor(scrptly: Scrptly, options: RenderOptions | undefined, settings: ProjectSettings, flow: Action[]);
    listenToEvents(url: string): Promise<void>;
    render(): Promise<any>;
}
