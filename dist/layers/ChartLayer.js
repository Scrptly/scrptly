import VisualLayer from './VisualLayer.js';
export default class ChartLayer extends VisualLayer {
    static type = 'chart';
    constructor(parent, properties = {}, settings) {
        super(parent, properties, settings);
    }
    static get propertiesDefinition() {
        return {
            ...super.propertiesDefinition,
            'data': {
                cssProperty: false,
                default: {},
                animatable: true,
            },
        };
    }
}
