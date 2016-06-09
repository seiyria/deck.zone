
import { Plugin } from '../_base/_plugin';

export class PageSize extends Plugin {

  static get snippets() {
    return [`
snippet pagesize
\tpagesize = \${1:width}, \${2:height}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { height, width } = args;

    state.options.page.width = super.combineForUnit(width, state);
    state.options.page.height = super.combineForUnit(height, state);
  }

}