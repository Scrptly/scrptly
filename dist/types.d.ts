export type Time = string | number;
export type Id = string;
export type Easing = 'step' | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint';
export type AddLayerOptions = {
    waitFor?: Time | 'finish';
    index?: number;
};
export type Action = {
    statement: 'wait';
    duration: Time;
} | {
    statement: 'parallel';
    actions: Action[][];
} | {
    statement: 'addLayer';
    id: Id;
    type: string;
    settings: Record<string, any>;
    properties: Record<string, any>;
    options?: AddLayerOptions;
} | {
    statement: 'removeLayer';
    id: Id;
} | {
    statement: 'set';
    id: Id;
    value: Record<string, any>;
} | {
    statement: 'animate';
    id: Id;
    from: Record<string, any>;
    to: Record<string, any>;
    settings: {
        duration: Time;
        easing?: Easing;
        wait?: boolean;
    };
} | {
    statement: 'ttsSay';
    id: Id;
    text: string;
};
