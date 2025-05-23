import AuditoryLayer from './AuditoryLayer.js';
class AudioLayer extends AuditoryLayer {
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get isAsset() {
        return true;
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
            sourceType: 'url',
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
        };
    }
}
AudioLayer.type = 'audio';
export default AudioLayer;
