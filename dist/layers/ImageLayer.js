import MediaLayer from './MediaLayer.js';
class ImageLayer extends MediaLayer {
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
ImageLayer.type = 'image';
export default ImageLayer;
