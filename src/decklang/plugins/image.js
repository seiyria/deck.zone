
import { Plugin } from '../_base/_plugin';

export class Image extends Plugin {

  static get help() { return 'image = index, "url", x, y, width, height'; }

  static get docs() { return 'The image directive is used to draw images on cards.'; }

  static get examples() { return ['image = 1, "http://example.com/image.png", 0, 0, 2cm, 2cm']; }

  static get snippets() {
    return [`
snippet image
\timage = \${1:index}, "\${2:url}", \${3:x}, \${4:y}, \${5:width}, \${6:height}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const { x, y, w, h, url } = args;

    const card = state.getCard(args.index);
    card.images.push({
      top: super.combineForUnit(y, state),
      left: super.combineForUnit(x, state),
      width: super.combineForUnit(w, state),
      height: super.combineForUnit(h, state),
      url
    });
  }

}