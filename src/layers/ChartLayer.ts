import VisualLayer, { VisualLayerProperties, VisualLayerSettings } from './VisualLayer';

export type ChartLayerSettings = VisualLayerSettings & {
	type?: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter';
	options?: any; // Chart.js options object
};
export type ChartLayerProperties = VisualLayerProperties & {
	data?: any; // Chart.js data object
};

export default class ChartLayer extends VisualLayer {
	static type = 'chart';
	declare settings: ChartLayerSettings;
	declare properties: ChartLayerProperties;

	constructor(parent: any, properties: ChartLayerProperties = {}, settings: ChartLayerSettings) {
		super(parent, properties, settings);
	}

	static get defaultSettings(): Partial<ChartLayerSettings> {
		return {
			...super.defaultSettings,
			type: 'line',
			options: {
				layout: {
					padding: 20,
				}
			}
		};
	}
	static get propertiesDefinition() {
		return {
			...super.propertiesDefinition,
			'data': { // Chart.js data object
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