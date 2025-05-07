import { TextualLayer, TextualLayerProperties, TextualLayerSettings } from './TextualLayer';

export interface TextLayerProperties extends TextualLayerProperties {
  text?: string;
}
export interface TextLayerSettings extends TextualLayerSettings {}

export class TextLayer extends TextualLayer {
  properties!: TextLayerProperties;
  settings!: TextLayerSettings;
  static type = 'text';

  constructor(parent: any, settings: TextLayerSettings = {}, properties: TextLayerProperties = {}) {
    super(parent, settings, properties);
	this.properties = {
		text: 'Type your text here',
		...this.properties,
	};
  }
}