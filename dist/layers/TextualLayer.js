import VisualLayer from './VisualLayer';
export default class TextualLayer extends VisualLayer {
    static type = 'textual';
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
            'fontSize': {
                cssProperty: 'font-size',
                units: ['em', 'px'],
                default: 1.0,
                animatable: true,
            },
            'fontFamily': {
                cssProperty: 'font-family',
                default: 'Noto Sans',
                animatable: false,
            },
            'fontWeight': {
                cssProperty: 'font-weight',
                default: 400,
                animatable: true,
            },
            'fontStyle': {
                cssProperty: 'font-style',
                enum: ['normal', 'italic', 'oblique'],
                default: 'normal',
                animatable: false,
            },
            'fontStretch': {
                cssProperty: 'font-stretch',
                units: ['%'],
                default: 100,
                animatable: true,
            },
            'color': {
                default: '#FFFFFF',
                animatable: true,
            },
            'textAlign': {
                cssProperty: 'text-align',
                enum: ['left', 'right', 'center', 'justify'],
                default: 'center',
                animatable: false,
            },
            'verticalAlign': {
                cssProperty: 'vertical-align',
                enum: ['top', 'middle', 'bottom'],
                default: 'middle',
                animatable: false,
            },
            'padding': {
                cssProperty: 'padding',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'textStroke': {
                default: false,
                animatable: false,
            },
            'textStrokeWidth': {
                cssProperty: '-webkit-text-stroke-width',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'textStrokeColor': {
                cssProperty: '-webkit-text-stroke-color',
                default: '#000000',
                animatable: true,
            },
            'textShadow': {
                default: false,
                animatable: false,
            },
            'textShadowColor': {
                cssProperty: '--text-shadow-color',
                default: '#000000',
                animatable: true,
            },
            'textShadowOffset': {
                cssProperty: '--text-shadow-offset',
                units: ['px'],
                default: [0, 0],
                animatable: true,
            },
            'textShadowBlur': {
                cssProperty: '--text-shadow-blur',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'letterSpacing': {
                cssProperty: 'letter-spacing',
                units: ['em', 'px'],
                default: 0,
                animatable: true,
            },
            'lineHeight': {
                cssProperty: 'line-height',
                units: ['em', 'px', ''],
                default: 1.2,
                animatable: true,
            },
            'textTransform': {
                cssProperty: 'text-transform',
                enum: ['none', 'capitalize', 'uppercase', 'lowercase'],
                default: 'none',
                animatable: false,
            },
            'textDecoration': {
                cssProperty: 'text-decoration',
                enum: ['none', 'underline', 'overline', 'line-through'],
                default: 'none',
                animatable: false,
            },
            'wordSpacing': {
                cssProperty: 'word-spacing',
                units: ['em', 'px'],
                default: 0,
                animatable: true,
            },
            'textIndent': {
                cssProperty: 'text-indent',
                units: ['em', 'px'],
                default: 0,
                animatable: true,
            },
            'direction': {
                cssProperty: 'direction',
                enum: ['ltr', 'rtl'],
                default: 'ltr',
                animatable: false,
            },
        };
    }
}
