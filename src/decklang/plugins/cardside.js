
import { Plugin } from '../_base/_plugin';

export class CardSide extends Plugin {

  static get help() { return 'cardside = side'; }

  static get docs() { return 'The cardside directive is used to determine which side all following directives should operate on.'; }

  static get examples() {
    return [
      'cardside = front',
      'cardside = back'
    ];
  }

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