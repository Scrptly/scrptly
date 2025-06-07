import AuditoryLayer from './AuditoryLayer.js';
export default class AudioLayer extends AuditoryLayer {
    static type = 'audio';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
        if ('source' in settings && 'source' in this.settings && settings.source && !settings.sourceType)
            this.settings.sourceType = this.autoDetermineSourceType(settings.source);
    }
    static get isAsset() {
        return true;
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
        };
    }
}
