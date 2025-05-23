import { randomUUID } from 'crypto';
class BaseLayer {
    constructor(parent, properties = {}, settings) {
        this.removed = false;
        this.parent = parent;
        this.id = randomUUID();
        this.settings = {
            ...(this.constructor.defaultSettings),
            ...settings,
        };
        this.properties = {
            ...(this.constructor.defaultProperties),
            ...properties
        };
    }
    autoDetermineSourceType(source) {
        if (source.startsWith('https://assets.scrptly.com/')) {
            return 'asset';
        }
        else if (source.startsWith('https://') || source.startsWith('http://')) {
            return 'url';
        }
        else if (source.startsWith('data:')) {
            return 'base64';
        }
        else if (source.startsWith('file://') || (!source.match(/[:=]/) && source.match(/[\.][a-z0-9]{3,4}$/i))) {
            return 'file';
        }
    }
    static get isAsset() {
        return false;
    }
    static get defaultSettings() {
        return {
            name: 'Layer',
            enabled: true,
            locked: false,
            startTime: 0,
            endTime: false,
            speed: 1,
        };
    }
    static get defaultProperties() {
        return Object.fromEntries(Object.entries(this.propertiesDefinition).map(([k, v]) => [k, v.default || '']));
    }
    static get propertiesDefinition() {
        return {};
    }
    set(value) {
        this.parent.pushAction({ statement: 'set', id: this.id, value });
        return this;
    }
    animate(from, to, settings = { duration: 0 }) {
        this.parent.pushAction({ statement: 'animate', id: this.id, from, to, settings });
        return this;
    }
    remove() {
        if (this.removed)
            throw new Error('Layer already removed');
        this.removed = true;
        this.parent.pushAction({ statement: 'removeLayer', id: this.id });
        return this;
    }
}
BaseLayer.type = 'base';
export default BaseLayer;
