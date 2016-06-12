
import { Plugin } from '../_base/_plugin';

export class NewCard extends Plugin {

  static get snippets() {
    return [`
snippet newcard
\tnewcard = \${1:indexname}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);
    const { name } = args;

    // the length will always be +1 to the cards, unless people are doing some strange math
    // if they're doing strange math, they should probably not use this
    scope[name] = state.cards.front.length;
  }

}