
import { Plugin } from '../_base/_plugin';

export class Text extends Plugin {

  static get snippets() {
    return [`
snippet text
\ttext = \${1:index}, "\${2:string}", \${3:x}, \${4:y}, \${5:width}, \${6:height}, \${7:horizontal}, \${8:vertical}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);

    const card = state.getCard(args.index);
    card.texts.push(args);
  }

}