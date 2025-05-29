import VisualLayer from './VisualLayer.js';
export default class FolderLayer extends VisualLayer {
    children = [];
    static type = 'folder';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
        };
    }
}
