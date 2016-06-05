
import { Plugin } from '../_base/_plugin';

export class CardsPerPage extends Plugin {

  static get snippets() {
    return [`
snippet cardsperpage
\tcardsperpage = \${1:cardsPerRow}, \${2:rowsPerPage}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { cardsPerRow, rowsPerPage } = args;

    state.options.page.cardsPerPage = { cardsPerRow, rowsPerPage };
  }

}