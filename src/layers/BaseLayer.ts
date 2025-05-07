import type Scrptly from '../index';
import type { Id, Time, Easing } from '../types';
import { randomUUID } from 'crypto';

export interface BaseLayerSettings {
  name?: string;
  enabled?: boolean;
  locked?: boolean;
  startTime?: number;
  endTime?: number;
  speed?: number;
}

export interface BaseLayerProperties {}

export class BaseLayer {
  readonly id: Id;
  static type = 'base';
  settings: BaseLayerSettings;
  properties: BaseLayerProperties;
  protected parent: Scrptly;

  constructor(parent: Scrptly, settings: BaseLayerSettings, properties: BaseLayerProperties = {}) {
    this.parent = parent;
    this.id = randomUUID();
    this.settings = {
      name: 'Layer',
      enabled: true,
      locked: false,
      startTime: 0,
      endTime: 0,
      speed: 1,
      ...settings,
    };
    this.properties = { ...properties };
  }

  set(value: Record<string, any>) {
    Object.assign(this.properties, value);
    this.parent.pushAction({ statement: 'set', layer: this.id, value });
    return this;
  }

  animate(
    from: Record<string, any>,
    to: Record<string, any>,
    settings: { duration: Time; easing: Easing }
  ) {
    Object.assign(this.properties, to);
    this.parent.pushAction({ statement: 'animate', layer: this.id, from, to, settings });
    return this;
  }
}
