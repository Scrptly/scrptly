import { VisualLayer, VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export interface CaptionsLayerSettings extends VisualLayerSettings {
  source: string;
  sourceType?: 'layer' | 'subtitles';
}
export interface CaptionsLayerProperties extends VisualLayerProperties {}

export class CaptionsLayer extends VisualLayer {
  source!: string;
  sourceType!: 'layer' | 'subtitles';
  static type = 'captions';
  settings!: CaptionsLayerSettings;
  properties!: CaptionsLayerProperties;

  constructor(parent: any, settings: CaptionsLayerSettings, properties: CaptionsLayerProperties = {}) {
    super(parent, settings, properties);
    this.settings = {
		sourceType: 'layer',
      ...this.settings,
    };
  }
}