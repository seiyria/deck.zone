
import { Plugin } from './_plugin';

export class Border extends Plugin {
  static operate(args, state) {
    const { style, color, width } = args;

    state.options.card['border-style'] = style;
    state.options.card['border-color'] = color;
    state.options.card['border-width'] = width;
  }

}