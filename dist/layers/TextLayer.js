import TextualLayer from './TextualLayer.js';
export default class TextLayer extends TextualLayer {
    static type = 'text';
    constructor(parent, properties = {}, settings = {}) {
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
            'text': {
                cssProperty: false,
                default: 'Type your text here',
                animatable: false,
            },
        };
    }
}
