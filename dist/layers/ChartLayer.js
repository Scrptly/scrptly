import VisualLayer from './VisualLayer.js';
export default class ChartLayer extends VisualLayer {
    static type = 'chart';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get defaultSettings() {
        return {
            ...super.defaultSettings,
            type: 'line',
            options: {
                layout: {
                    padding: 15,
                }
            }
        };
    }
    static get propertiesDefinition() {
        return {
            ...super.propertiesDefinition,
            'data': {
                cssProperty: false,
                default: {},
                animatable: true,
            },
            'backgroundColor': {
                ...super.propertiesDefinition.backgroundColor,
                default: '#FFFFFF',
            },
        };
    }
}
