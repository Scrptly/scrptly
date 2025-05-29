import MediaLayer from './MediaLayer';
import AuditoryLayer from './AuditoryLayer';
export default class VideoLayer extends MediaLayer {
    static type = 'video';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
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
