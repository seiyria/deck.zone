
import { Plugin } from '../_base/_plugin';

export class CardMargins extends Plugin {

  static get help() { return 'cardmargins = left, right, top, bottom'; }

  static get docs() { return 'The cardmargins directive is used to put margins between cards when printing.'; }

  static get examples() {
    return [
      'cardmargins = 5px',
      'cardmargins = 5px, 5px, 5px, 5px'
    ];
  }

  static get snippets() {
    return [`
snippet cardmargins
\tcardmargins = \${1:left}, \${2:right}, \${3:top}, \${4:bottom}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { top, left, right, bottom } = args;

    state.options.card['margin-top'] = super.combineForUnit(top, state);
    state.options.card['margin-left'] = super.combineForUnit(left, state);
    state.options.card['margin-right'] = super.combineForUnit(right, state);
    state.options.card['margin-bottom'] = super.combineForUnit(bottom, state);
  }

}