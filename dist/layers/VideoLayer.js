import MediaLayer from './MediaLayer.js';
import AuditoryLayer from './AuditoryLayer.js';
class VideoLayer extends MediaLayer {
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
VideoLayer.type = 'video';
export default VideoLayer;
