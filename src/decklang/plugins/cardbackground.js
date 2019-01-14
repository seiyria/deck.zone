
import { Plugin } from '../_base/_plugin';

export class CardBackground extends Plugin {

  static get help() { return 'cardbackground = [cardindex ,] #fff'; }

  static get docs() { return 'The cardbackground directive is used to set the background color of all following cards, or all cards globally.'; }

  static get examples() {
    return [
      'cardbackground = #fff',
      'cardbackground = <newcardindex>, #fff',
      'cardbackground = rgb(255, 0, 0)',
      'cardbackground = rgba(255, 0, 0, 0.5)',
      'cardbackground = "transparent"'
    ];
  }

  static get snippets() {
    return [`
snippet cardbackground
\cardbackground = \${1:color}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { color } = args;

    // global
    if(_.isUndefined(args.index)) {
      state.options.card['background-color'] = color;

    // single card
    } else {
      const card = state.getCard(args.index);
      card.css['background-color'] = color;
    }
  }

}