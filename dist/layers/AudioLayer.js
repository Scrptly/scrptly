import AuditoryLayer from './AuditoryLayer';
export default class AudioLayer extends AuditoryLayer {
    static type = 'audio';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
        if (settings.source && !settings.sourceType)
            this.settings.sourceType = this.autoDetermineSourceType(settings.source);
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
