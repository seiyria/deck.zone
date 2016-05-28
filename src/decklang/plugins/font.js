
import { Plugin } from './_plugin';

export class Font extends Plugin {
  static operate(args, state) {
    const { family, color, decoration, css } = args;

    state.options.font.family = family;
    state.options.font.color = color;
    state.options.font.decoration = decoration;
    state.options.font.size = css.val;
    state.options.font.unit = this.resolveUnit(css.unit, state);
  }

}