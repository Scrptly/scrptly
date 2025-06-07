import TextualLayer from './TextualLayer.js';
export default class CaptionsLayer extends TextualLayer {
    static type = 'captions';
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
            'text': {
                cssProperty: false,
                default: undefined, // No default text, captions will be generated from the source
                animatable: false,
            },
        };
    }
}
