
import { Plugin } from '../_base/_plugin';

export class Check extends Plugin {

  static get help() { return 'check = [<var>|num|string] [operator] [<var>|num|string]'; }

  static get snippets() {
    return [`
snippet check
\tcheck = \${1:operand} \${2:==} \${3:operand}
\t\t\${4}
\tendcheck
`];
  }

}