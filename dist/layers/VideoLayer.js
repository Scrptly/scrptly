import MediaLayer from './MediaLayer.js';
import AuditoryLayer from './AuditoryLayer.js';
export default class VideoLayer extends MediaLayer {
    static type = 'video';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
        if ('image' in settings && settings.image && 'source' in settings.image &&
            'image' in this.settings && this.settings.image && 'source' in this.settings.image &&
            settings.image.source && !settings.image.sourceType)
            this.settings.image.sourceType = this.autoDetermineSourceType(settings.image.source);
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
            ...AuditoryLayer.defaultSettings,
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
            ...AuditoryLayer.defaultProperties,
        };
    }
    static get propertiesDefinition() {
        let props = super.propertiesDefinition;
        return {
            ...props,
            ...AuditoryLayer.propertiesDefinition,
            'fit': {
                ...props.fit,
                default: 'cover',
            },
        };
    }
}
