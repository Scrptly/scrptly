import { VisualLayer } from './VisualLayer';
import type { BaseLayer } from './BaseLayer';

export class FolderLayer extends VisualLayer {
  children: BaseLayer[] = [];
  static type = 'folder';
}