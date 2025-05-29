import MediaLayer from './MediaLayer';
export default class ImageLayer extends MediaLayer {
    static type = 'image';
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
}
