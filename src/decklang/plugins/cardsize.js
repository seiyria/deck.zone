
import { Plugin } from './_plugin';

export class CardSize extends Plugin {
  static operate(args, state) {
    const { width, height } = args;

    state.options.card.width = `${width[0]}${width[1]}`;
    state.options.card.height = `${height[0]}${height[1]}`;
  }

}