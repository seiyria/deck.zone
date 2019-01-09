
import _ from 'lodash';

import { Plugin } from '../_base/_plugin';

export class Text extends Plugin {

  static get help() { return 'text = index, "text", x, y, width, height [, horizontalalign [, verticalalign] ]'; }

  static get docs() { return 'The text directive is used to draw text on a card.'; }

  static get examples() { return ['text = 1, "This is some text", 0, 0, 1cm, 1cm, center, middle']; }

  static get snippets() {
    return [`
snippet text
\ttext = \${1:index}, "\${2:string}", \${3:x}, \${4:y}, \${5:width}, \${6:height}, \${7:horizontal}, \${8:vertical}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { x, y, w, h, string, horizAlign, vertAlign } = args;

    const card = state.getCard(args.index);

    card.texts.push({
      top: super.combineForUnit(y, state),
      left: super.combineForUnit(x, state),
      width: super.combineForUnit(w, state),
      height: super.combineForUnit(h, state),
      font: _.cloneDeep(state.options.font),
      horizAlign, vertAlign, state, string
    });
  }

}