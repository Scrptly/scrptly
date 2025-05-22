import AudioLayer from './AudioLayer.js';
class TTSLayer extends AudioLayer {
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
    say(text) {
        this.parent.pushAction({ statement: 'ttsSay', id: this.id, text });
        return this;
    }
}
TTSLayer.type = 'tts';
export default TTSLayer;
