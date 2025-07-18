import type Scrptly from '../index.js';
import type { Id, Time, Easing } from '../types.js';
export type BaseLayerSettings = {
    name?: string;
    enabled?: boolean;
    locked?: boolean;
    startTime?: number;
    endTime?: false | number;
    speed?: number;
};
export type BaseLayerProperties = {};
export type PropertyDefinition = {
    cssProperty?: string;
    units?: string[];
    default: any;
    animatable: boolean;
};
export default class BaseLayer {
    readonly id: Id;
    static type: string;
    settings: BaseLayerSettings;
    properties: BaseLayerProperties;
    protected parent: Scrptly;
    private removed;
    constructor(parent: Scrptly, properties: BaseLayerProperties | undefined, settings: BaseLayerSettings);
    autoDetermineSourceType(source: string): "asset" | "url" | "base64" | "file" | "id" | "other";
    static get isAsset(): boolean;
    static get defaultSettings(): Partial<BaseLayerSettings>;
    static get defaultProperties(): Partial<BaseLayerProperties>;
    static get propertiesDefinition(): Record<string, PropertyDefinition>;
    set(value: Record<string, any>): this;
    animate(from: Record<string, any>, to: Record<string, any>, { duration, easing, wait }?: {
        duration: Time;
        easing?: Easing;
        wait?: boolean;
    }): this;
    remove(): this;
}
