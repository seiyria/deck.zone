
import { Plugin } from '../_base/_plugin';

export class Rect extends Plugin {

  static get help() { return 'rect = index, x1, y1, x2, y2 [, borderWidth [, lineColor [, fillColor] ] ]'; }

  static get docs() { return 'The rect directive is used to draw rects on a card. It can also be used to draw simple lines.'; }

  static get examples() { return ['rect = 1, 1, 4, 4, 1px, #aca, #bab']; }

  static get snippets() {
    return [`
snippet rect
\rect = \${1:index}, \${2:x1}, \${3:y1}, \${4:x2}, \${5:y2}, \${6:borderWidth}, \${7:lineColor}, \${8:fillColor}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { x1, y1, x2, y2, thickness, lineColor, fillColor } = args;

    const left = super.combineForUnit(x1, state);
    const top = super.combineForUnit(y1, state);

    const card = state.getCard(args.index);
    card.shapes.push({
      shape: 'rect',
      left,
      top,
      width: `calc(${super.combineForUnit(x2, state)} - ${left})`,
      height: `calc(${super.combineForUnit(y2, state)} - ${top})`,
      'border-width': super.combineForUnit(thickness, state),
      'border-color': lineColor,
      background: fillColor || 'transparent',
      'z-index': scope.blockLevelOps
    });
  }

}