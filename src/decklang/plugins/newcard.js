
import { Plugin } from '../_base/_plugin';

export class NewCard extends Plugin {

  static get help() { return 'newcard = indexname'; }

  static get docs() { return 'The newcard directive is a shortcut to create a new card and get the index for it put into a variable.'; }

  static get examples() { return ['newcard = "newcardindex"']; }

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