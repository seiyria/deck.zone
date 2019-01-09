
import { Plugin } from '../_base/_plugin';

export class Border extends Plugin {

  static get help() { return 'border = style [, csscolor [, width] ]'; }

  static get docs() { return 'The border directive is used to add a border to all cards.'; }

  static get examples() { return ['border = solid, #000, 2px']; }

  static get snippets() {
    return [`
snippet border
\tborder = \${1:style}, \${2:#000}, \${3:width}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { style, color, width } = args;

    state.options.card['border-style'] = style;
    state.options.card['border-color'] = color;
    state.options.card['border-width'] = super.combineForUnit(width, state);
    // state.options.card['outline-offset'] = `-${state.options.card['outline-width']}`;
  }

}