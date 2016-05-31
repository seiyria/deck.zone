
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

    state.options.page.height = `${args.height.val}${args.height.unit}`;
    state.options.page.width = `${args.width.val}${args.width.unit}`;
  }

}