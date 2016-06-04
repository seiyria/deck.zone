
import { Plugin } from '../_base/_plugin';

export class CardSide extends Plugin {

  static get snippets() {
    return [`
snippet cardside
\tcardside = \${1:side}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { side } = args;

    state.options.cardside = side;
  }

}