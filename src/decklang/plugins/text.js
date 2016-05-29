
import { Plugin } from '../_base/_plugin';

export class Text extends Plugin {

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    if(!state.cards[args.index]) state.cards[args.index] = state.newCard();
    state.cards[args.index].texts.push(args);
  }

}