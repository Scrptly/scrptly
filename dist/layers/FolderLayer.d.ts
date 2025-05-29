import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';
import type BaseLayer from './BaseLayer';
export interface FolderLayerSettings extends VisualLayerSettings {
}
export interface FolderLayerProperties extends VisualLayerProperties {
}
export default class FolderLayer extends VisualLayer {
    children: BaseLayer[];
    static type: string;
    settings: FolderLayerSettings;
    properties: FolderLayerProperties;
    constructor(parent: any, properties: FolderLayerProperties | undefined, settings: FolderLayerSettings);
    static get defaultSettings(): Partial<FolderLayerSettings>;
    static get defaultProperties(): Partial<FolderLayerProperties>;
}
