import VisualLayer from './VisualLayer.js';
class CaptionsLayer extends VisualLayer {
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
CaptionsLayer.type = 'captions';
export default CaptionsLayer;
