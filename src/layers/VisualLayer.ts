import { BaseLayer } from './BaseLayer';
import type { Time, Easing } from '../types';

export class VisualLayer extends BaseLayer {
  visible = true;
  opacity = 1;
  blendMode?: string;
  position?: [number, number];
  scale?: [number, number];
  rotation = 0;
  anchor?: [number, number];
  static type = 'visual';

  show() { return this.set({ visible: true }); }
  hide() { return this.set({ visible: false }); }
  toggle() { return this.set({ visible: !this.visible }); }
  fadeIn(duration: Time = 300, easing: Easing = 'linear') {
    return this.animate({ opacity: 0, visible: true }, { opacity: 1 }, { duration, easing });
  }
  fadeOut(duration: Time = 300, easing: Easing = 'linear') {
    return this.animate({ opacity: 1 }, { opacity: 0, visible: false }, { duration, easing });
  }
}