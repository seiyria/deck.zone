
import { Plugin } from './_plugin';

export class Unit extends Plugin {
  static operate(args, state) {
    const { unit } = args;

    state.options.unit = unit;
  }

}