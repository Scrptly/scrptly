import BaseLayer from './BaseLayer.js';
class AuditoryLayer extends BaseLayer {
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
    static get propertiesDefinition() {
        return {
            ...super.propertiesDefinition,
            'volume': {
                default: 1,
                animatable: true,
            },
            'pan': {
                default: 0,
                animatable: true,
            },
            'pitch': {
                default: 1,
                animatable: true,
            },
            'mute': {
                default: false,
                animatable: false,
            },
        };
    }
}
AuditoryLayer.type = 'auditory';
export default AuditoryLayer;
