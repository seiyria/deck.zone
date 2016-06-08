
import { Plugin } from '../_base/_plugin';

export class Ellipse extends Plugin {

  static get snippets() {
    return [`
snippet ellipse
\tellipse = \${1:index}, \${2:x}, \${3:y}, \${4:width}, \${5:height}, \${6:thickness}, \${7:outercolor}, \${8:innercolor}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const card = state.getCard(args.index);
    card.shapes.push(args);
  }

}