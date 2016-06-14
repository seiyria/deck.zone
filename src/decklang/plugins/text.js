
import _ from 'lodash';

import { Plugin } from '../_base/_plugin';

export class Text extends Plugin {

  static get help() { return 'text = index, string, x, y, width, height [, horizontalalign [, verticalalign] ]'; }

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