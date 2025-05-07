import { AudioLayer } from './AudioLayer';
import type { TTSPrompt } from '../types';

export class TTSLayer extends AudioLayer {
  voice!: string;
  model!: string;
  prompts: TTSPrompt[] = [];
  static type = 'tts';

  say(text: string) {
    const prompt: TTSPrompt = {
      text,
      startAt: this.prompts.length ? this.prompts[this.prompts.length - 1].startAt : 0
    };
    this.prompts.push(prompt);
    this.parent.pushAction({ statement: 'ttsSay', layer: this.id, text });
    return this;
  }
}