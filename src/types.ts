export type Time = string | number;
export type Id = string;
export type Easing = 'step' | 'linear' | 'easeIn' | 'easeOut' | 'easeInOut'; // | 'easeInSine' | 'easeOutSine' | 'easeInOutSine' | 'easeInQuad' | 'easeOutQuad' | 'easeInOutQuad' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic' | 'easeInQuart' | 'easeOutQuart' | 'easeInOutQuart' | 'easeInQuint' | 'easeOutQuint' | 'easeInOutQuint';

export type AddLayerOptions = {
	waitFor?: Time | 'finish', // wait for this time after adding the layer before continuing to the next action
	index?: number, // index for ordering the layer in the timeline, negative values put the layer at the back and positive values at the front
};

export type Action =
	  { statement: 'wait'; duration: Time }
	| { statement: 'parallel'; actions: Action[][] }
	| { statement: 'addLayer'; id: Id; type: string; settings: Record<string, any>; properties: Record<string, any>; options?: AddLayerOptions }
	| { statement: 'removeLayer'; id: Id; }
	| { statement: 'set'; id: Id; value: Record<string, any> }
	| { statement: 'animate'; id: Id; from: Record<string, any>; to: Record<string, any>; settings: { duration: Time; easing?: Easing, wait?: boolean } }
	| { statement: 'ttsSay'; id: Id; text: string, settings?: { wait?: boolean } };
