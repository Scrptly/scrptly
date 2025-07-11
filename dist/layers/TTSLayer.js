import AuditoryLayer from './AuditoryLayer.js';
export default class TTSLayer extends AuditoryLayer {
    static type = 'tts';
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
    say(text, settings = {}) {
        this.parent.pushAction({ statement: 'ttsSay', id: this.id, text, settings });
        return this;
    }
}
