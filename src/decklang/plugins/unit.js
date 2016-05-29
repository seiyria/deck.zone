
import { Plugin } from '../_base/_plugin';

export class Unit extends Plugin {
  static operate(args, state) {
    const { unit } = args;

    state.options.unit = unit;
  }

}