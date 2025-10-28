import type Scrptly from './index.js';
import { AiAgentParameters } from './index.js';
export type AgentOptions = {
    verbose?: boolean;
};
export default class Agent {
    scrptly: Scrptly;
    options: AgentOptions;
    parameters: AiAgentParameters;
    projectId?: string;
    projectUrl?: string;
    taskId?: string;
    task: any;
    constructor(scrptly: Scrptly, parameters: AiAgentParameters, options: AgentOptions);
    listenToEvents(url: string): Promise<unknown>;
    generateAiVideo(ctx: any): Promise<any>;
}
