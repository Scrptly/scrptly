import { VisualLayer, VisualLayerProperties, VisualLayerSettings } from './VisualLayer';
import type { BaseLayer } from './BaseLayer';

export interface FolderLayerSettings extends VisualLayerSettings { }
export interface FolderLayerProperties extends VisualLayerProperties { }

export class FolderLayer extends VisualLayer {
	children: BaseLayer[] = [];
	static type = 'folder';
	settings!: FolderLayerSettings;
	properties!: FolderLayerProperties;

	constructor(parent: any, settings: FolderLayerSettings, properties: FolderLayerProperties = {}) {
		super(parent, settings, properties);
	}
}