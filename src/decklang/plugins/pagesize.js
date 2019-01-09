
import { Plugin } from '../_base/_plugin';

export class PageSize extends Plugin {

  static get help() { return 'pagesize = width, height'; }

  static get docs() { return 'The pagesize directive is used to determine the print size of the page.'; }

  static get examples() {
    return [
      'pagesize = 8.5in, 11in',
      'pagesize = letter'
    ];
  }

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