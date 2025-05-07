import { VisualLayer } from './VisualLayer';

export class TextualLayer extends VisualLayer {
  textAlign?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  stroke?: string;
  strokeWidth?: number;
  textShadow?: string;
  textShadowColor?: string;
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;
  textShadowBlur?: number;
  static type = 'textual';
}