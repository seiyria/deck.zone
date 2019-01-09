
import { Plugin } from '../_base/_plugin';

export class Ellipse extends Plugin {

  static get help() { return 'ellipse = index, x, y, width, height [, thickness [, outercolor [, innercolor] ] ]'; }

  static get docs() { return 'The ellipse directive is used to draw ellipses on a card.'; }

  static get examples() { return ['ellipse = 1, 0, 0, 2cm, 2cm, 1px, #000, #f00']; }

  static get snippets() {
    return [`
snippet ellipse
\tellipse = \${1:index}, \${2:x}, \${3:y}, \${4:width}, \${5:height}, \${6:thickness}, \${7:outercolor}, \${8:innercolor}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { x, y, w, h, thickness, outerColor, innerColor } = args;

    const card = state.getCard(args.index);
    card.shapes.push({
      shape: 'ellipse',
      top: super.combineForUnit(y, state),
      left: super.combineForUnit(x, state),
      width: super.combineForUnit(w, state),
      height: super.combineForUnit(h, state),
      'border-width': super.combineForUnit(thickness, state),
      'border-color': outerColor,
      'background-color': innerColor
    });
  }

}