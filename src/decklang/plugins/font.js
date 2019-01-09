
import { Plugin } from '../_base/_plugin';

export class Font extends Plugin {

  static get help() { return 'font = font, fontsize [, style [, color] ]'; }

  static get docs() { return 'The font directive is used to change the font properties of all following text directives.'; }

  static get examples() { return ['font = "Arial", 16px, BUI, #000']; }

  static get snippets() {
    return [`
snippet font
\tfont = "\${1:font}", \${2:fontsize}, \${3:BUIS}, \${4:#000}
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