import VisualLayer from './VisualLayer.js';
class MediaLayer extends VisualLayer {
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
    static get propertiesDefinition() {
        return {
            ...super.propertiesDefinition,
            'fit': {
                enum: ['contain', 'cover'],
                default: 'contain',
                animatable: false,
            },
            'objectFit': {
                cssProperty: 'object-fit',
                enum: ['fill', 'contain', 'cover'],
                default: 'fill',
                animatable: false,
            },
        };
    }
}
MediaLayer.type = 'media';
export default MediaLayer;
