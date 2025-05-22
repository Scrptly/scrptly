import AudioLayer from './AudioLayer.js';
class AudioTrackLayer extends AudioLayer {
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
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
}
AudioTrackLayer.type = 'audioTrack';
export default AudioTrackLayer;
