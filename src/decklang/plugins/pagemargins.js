
import { Plugin } from '../_base/_plugin';

export class PageMargins extends Plugin {

  static get snippets() {
    return [`
snippet pagemargins
\tpagemargins = \${1:left}, \${2:right}, \${3:top}, \${4:bottom}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { top, left, right, bottom } = args;

    state.options.page['margin-top'] = super.combineForUnit(top, state);
    state.options.page['margin-left'] = super.combineForUnit(left, state);
    state.options.page['margin-right'] = super.combineForUnit(right, state);
    state.options.page['margin-bottom'] = super.combineForUnit(bottom, state);
  }

}