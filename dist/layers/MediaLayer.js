import VisualLayer from './VisualLayer.js';
export default class MediaLayer extends VisualLayer {
    static type = 'media';
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
