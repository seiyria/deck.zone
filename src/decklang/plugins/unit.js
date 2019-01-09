
import { Plugin } from '../_base/_plugin';

export class Unit extends Plugin {

  static get help() { return 'unit = cssunit'; }

  static get docs() { return 'The unit directive sets a default unit for use with all number-related directives.'; }

  static get examples() { return ['unit = cm']; }

  static get snippets() {
    return [`
snippet unit
\tunit = \${1:unit}
    `];
  }

  static operate(args, state, scope) {
    super.operate(args, state, scope);
    const { unit } = args;

    state.options.unit = unit;
  }

}