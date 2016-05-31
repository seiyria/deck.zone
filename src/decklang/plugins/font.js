
import { Plugin } from '../_base/_plugin';

export class Font extends Plugin {

  static get snippets() {
    return [`
snippet cardsize
\tcardsize = "\${1:font}", \${2:fontsize}, \${3:BUI}, \${4:#000}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { family, color, decoration, css } = args;

    state.options.font.family = family;
    state.options.font.color = color;
    state.options.font.decoration = decoration;
    state.options.font.size = css.val;
    state.options.font.unit = this.resolveUnit(css.unit, state);
  }

}