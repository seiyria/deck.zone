
import { Plugin } from '../_base/_plugin';

export class Image extends Plugin {

  static get snippets() {
    return [`
snippet image
\timage = \${1:index}, "\${2:url}", \${3:x}, \${4:y}, \${5:width}, \${6:height}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const card = state.getCard(args.index);
    card.images.push(args);
  }

}