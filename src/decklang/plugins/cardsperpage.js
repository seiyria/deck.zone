
import { Plugin } from '../_base/_plugin';

export class CardsPerPage extends Plugin {

  static get help() { return 'cardsperpage = cardsperrow, rowsperpage'; }

  static get docs() { return 'The cardsperpage directive is used to determine how many cards will fit on the page (first the number of cards per row, then the number of rows per page).'; }

  static get examples() { return ['cardsperpage = 3, 3']; }

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