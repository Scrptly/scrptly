import MediaLayer from './MediaLayer.js';
import AudioLayer from './AudioLayer.js';
class VideoLayer extends MediaLayer {
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
            ...AudioLayer.defaultSettings,
        };
    }
    static get defaultProperties() {
        return {
            ...super.defaultProperties,
            ...AudioLayer.defaultProperties,
        };
    }
    static get propertiesDefinition() {
        let props = super.propertiesDefinition;
        return {
            ...props,
            ...AudioLayer.propertiesDefinition,
            'fit': {
                ...props.fit,
                default: 'cover',
            },
        };
    }
}
VideoLayer.type = 'video';
export default VideoLayer;
