import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';
import type BaseLayer from './BaseLayer';

export interface FolderLayerSettings extends VisualLayerSettings { }
export interface FolderLayerProperties extends VisualLayerProperties { }

export default class FolderLayer extends VisualLayer {
	children: BaseLayer[] = [];
	static type = 'folder';
	declare settings: FolderLayerSettings;
	declare properties: FolderLayerProperties;

	constructor(parent: any, properties: FolderLayerProperties = {}, settings: FolderLayerSettings) {
		super(parent, properties, settings);
	}
	static get defaultSettings(): Partial<FolderLayerSettings> {
		return {
			...super.defaultSettings,
		};
	}
	static get defaultProperties(): Partial<FolderLayerProperties> {
		return {
			...super.defaultProperties,
		};
	}
}