
import { Plugin } from './_plugin';

export class CardSize extends Plugin {
  static operate(args, state) {
    const { width, height } = args;
    
    state.options.card.width = width;
    state.options.card.height = height;
  }

}