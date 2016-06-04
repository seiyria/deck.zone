
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

    state.options.page['margin-top'] = `${top.val}${this.resolveUnit(top.unit, state)}`;
    state.options.page['margin-left'] = `${left.val}${this.resolveUnit(left.unit, state)}`;
    state.options.page['margin-right'] = `${right.val}${this.resolveUnit(right.unit, state)}`;
    state.options.page['margin-bottom'] = `${bottom.val}${this.resolveUnit(bottom.unit, state)}`;
  }

}