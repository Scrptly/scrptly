import type Scrptly from '../index';
import type { Id, Time, Easing } from '../types';
import type { Action } from '../types';

function generateUUID(): Id {
  return Math.random().toString(36).substr(2, 9);
}

export class BaseLayer {
  readonly id: Id;
  name?: string;
  static type = 'base';
  enabled = true;
  locked = false;
  startTime = 0;
  endTime = 0;
  speed = 1;
  protected parent: Scrptly;

  constructor(parent: Scrptly, settings: Record<string, any> = {}) {
    this.parent = parent;
    this.id = generateUUID();
    Object.assign(this, settings);
  }

  set(value: Record<string, any>) {
    Object.assign(this, value);
    this.parent.pushAction({ statement: 'set', layer: this.id, value });
    return this;
  }

  animate(
    from: Record<string, any>,
    to: Record<string, any>,
    settings: { duration: Time; easing: Easing }
  ) {
    Object.assign(this, to);
    this.parent.pushAction({ statement: 'animate', layer: this.id, from, to, settings });
    return this;
  }
}
