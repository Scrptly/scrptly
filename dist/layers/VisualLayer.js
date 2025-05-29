import BaseLayer from './BaseLayer';
export default class VisualLayer extends BaseLayer {
    static type = 'visual';
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
    static get propertiesDefinition() {
        return {
            ...super.propertiesDefinition,
            'visible': {
                default: true,
                animatable: false,
            },
            'opacity': {
                default: 1,
                animatable: true,
            },
            'position': {
                cssProperty: '--position',
                default: [0.5, 0.5],
                animatable: true,
            },
            'scale': {
                cssProperty: '--scale',
                default: 1,
                animatable: true,
            },
            'rotation': {
                cssProperty: '--rotation',
                units: ['deg'],
                default: 0,
                animatable: true,
            },
            'anchor': {
                cssProperty: '--anchor',
                default: [0.5, 0.5],
                animatable: true,
            },
            // Background
            'backgroundColor': {
                cssProperty: 'background-color',
                default: 'transparent',
                animatable: true,
            },
            // Border
            'borderWidth': {
                cssProperty: 'border-width',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'borderStyle': {
                cssProperty: 'border-style',
                enum: ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
                default: 'none',
                animatable: false,
            },
            'borderColor': {
                cssProperty: 'border-color',
                default: 'black',
                animatable: true,
            },
            'borderRadius': {
                cssProperty: 'border-radius',
                units: ['', 'px', '%'], // '' unit is a special option that allows setting the value relative to the element's size while ensure the radius is a circle, not an ellipse (as it would be with %)
                default: 0,
                animatable: true,
            },
            // Box Shadow
            'boxShadow': {
                default: false,
                animatable: false,
            },
            'boxShadowBlur': {
                cssProperty: '--box-shadow-blur',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'boxShadowOffset': {
                cssProperty: '--box-shadow-offset',
                units: ['px'],
                default: [0, 0],
                animatable: true,
            },
            'boxShadowSpread': {
                cssProperty: '--box-shadow-spread',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'boxShadowColor': {
                cssProperty: '--box-shadow-color',
                default: '#000000',
                animatable: true,
            },
            // Outline
            'outlineWidth': {
                cssProperty: 'outline-width',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'outlineStyle': {
                cssProperty: 'outline-style',
                enum: ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
                default: 'none',
                animatable: false,
            },
            'outlineColor': {
                cssProperty: 'outline-color',
                default: 'black',
                animatable: true,
            },
            'outlineOffset': {
                cssProperty: 'outline-offset',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            // Filter (individual filter props as CSS variables)
            'filterBlur': {
                cssProperty: '--filter-blur',
                units: ['px'],
                default: 0,
                animatable: true,
            },
            'filterBrightness': {
                cssProperty: '--filter-brightness',
                default: 1,
                animatable: true,
            },
            'filterContrast': {
                cssProperty: '--filter-contrast',
                default: 1,
                animatable: true,
            },
            'filterGrayscale': {
                cssProperty: '--filter-grayscale',
                default: 0,
                animatable: true,
            },
            'filterSepia': {
                cssProperty: '--filter-sepia',
                default: 0,
                animatable: true,
            },
            'filterInvert': {
                cssProperty: '--filter-invert',
                default: 0,
                animatable: true,
            },
            'filterHueRotate': {
                cssProperty: '--filter-hue-rotate',
                units: ['deg'],
                default: 0,
                animatable: true,
            },
            'filterSaturate': {
                cssProperty: '--filter-saturate',
                default: 1,
                animatable: true,
            },
            'blendMode': {
                cssProperty: 'mix-blend-mode',
                enum: [
                    'normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten',
                    'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference',
                    'exclusion', 'hue', 'saturation', 'color', 'luminosity',
                ],
                default: 'normal',
                animatable: false,
            },
            'perspective': {
                cssProperty: '--perspective',
                units: ['px'],
                default: 0,
                animatable: true,
            },
        };
    }
    show() { return this.set({ visible: true }); }
    hide() { return this.set({ visible: false }); }
    toggle() { return this.set({ visible: !this.properties.visible }); }
    fadeIn(duration = '300ms', easing, wait) {
        return this.animate({ opacity: 0, visible: true }, { opacity: 1 }, { duration, easing, wait });
    }
    fadeOut(duration = '300ms', easing, wait) {
        return this.animate({ opacity: 1 }, { opacity: 0, visible: false }, { duration, easing, wait });
    }
}
