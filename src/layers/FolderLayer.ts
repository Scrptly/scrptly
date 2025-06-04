import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';
import type BaseLayer from './BaseLayer';

export type FolderLayerSettings = VisualLayerSettings;
export type FolderLayerProperties = VisualLayerProperties;

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