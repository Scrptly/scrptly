import VisualLayer from './VisualLayer.js';
export default class CaptionsLayer extends VisualLayer {
    source;
    sourceType;
    static type = 'captions';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
            sourceType: 'layer',
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
        };
    }
}
