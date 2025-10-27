import type { ContextInput } from './types.js';
import type Scrptly from './index.js';
export type AgentOptions = {
    approveUpTo: number;
    verbose?: boolean;
};
export default class Agent {
    scrptly: Scrptly;
    options: AgentOptions;
    prompt: string;
    context: ContextInput;
    projectId?: string;
    projectUrl?: string;
    taskId?: string;
    constructor(scrptly: Scrptly, prompt: string, context: ContextInput | undefined, options: AgentOptions);
    listenToEvents(url: string): Promise<unknown>;
    generateAiVideo(): Promise<unknown>;
}
