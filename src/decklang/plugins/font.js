
import { Plugin } from './_plugin';

export class Font extends Plugin {
  static operate(args, state) {
    const { family, color, decoration, size, unit } = args;

    state.options.font.family = family;
    state.options.font.color = color;
    state.options.font.decoration = decoration;
    state.options.font.size = size;
    state.options.font.unit = unit;
  }

}