
import { Plugin } from './_plugin';

export class CardSize extends Plugin {
  static operate(args, state) {
    const { width, height } = args;

    state.options.card.width = `${width.val}${this.resolveUnit(width.unit, state)}`;
    state.options.card.height = `${height.val}${this.resolveUnit(height.unit, state)}`;
  }

}