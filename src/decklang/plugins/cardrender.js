
import { Plugin } from '../_base/_plugin';

export class CardRender extends Plugin {

  static get help() { return 'cardrender = render'; }

  static get docs() { return 'The cardrender directive is used to toggle whether or not a card should be rendered. Useful for debugging.'; }

  static get examples() {
    return [
      'cardrender = yes',
      'cardrender = no'
    ];
  }

  static get snippets() {
    return [`
snippet cardrender
\tcardrender = \${1:yesorno}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { render } = args;

    const [front, back] = state.getCurrentCardFrontAndBack();
    front._cardrender = back._cardrender = render;
  }

}