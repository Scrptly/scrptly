import VisualLayer from './VisualLayer.js';
class FolderLayer extends VisualLayer {
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
        this.children = [];
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
FolderLayer.type = 'folder';
export default FolderLayer;
