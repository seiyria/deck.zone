
import { Plugin } from '../_base/_plugin';

export class CardsPerPage extends Plugin {

  static get snippets() {
    return [`
snippet cardsperpage
\tcardsperpage = \${1:count}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { cardCount } = args;

    state.options.page.cardsPerPage = cardCount;
  }

}