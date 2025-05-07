export type Time = string | number;
export type Id = string;
export type Easing = string;

export interface TTSPrompt { text: string; startAt: Time; }

export type Action =
  | { statement: 'wait'; duration: Time }
  | { statement: 'parallel'; actions: Action[][] }
  | { statement: 'addLayer'; id: Id; type: string; settings: Record<string, any> }
  | { statement: 'set'; layer: Id; value: Record<string, any> }
  | { statement: 'animate'; layer: Id; from: Record<string, any>; to: Record<string, any>; settings: { duration: Time; easing: Easing } }
  | { statement: 'ttsSay'; layer: Id; text: string };
