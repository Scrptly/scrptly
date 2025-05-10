import { VisualLayer, VisualLayerProperties, VisualLayerSettings } from './VisualLayer';
import type { BaseLayer } from './BaseLayer';

export interface FolderLayerSettings extends VisualLayerSettings { }
export interface FolderLayerProperties extends VisualLayerProperties { }

export class FolderLayer extends VisualLayer {
	children: BaseLayer[] = [];
	static type = 'folder';
	settings!: FolderLayerSettings;
	properties!: FolderLayerProperties;

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

	constructor(parent: any, properties: FolderLayerProperties = {}, settings: FolderLayerSettings) {
		super(parent, properties, settings);
	}
}