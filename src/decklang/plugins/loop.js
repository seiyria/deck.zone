
import { Plugin } from '../_base/_plugin';

export class Loop extends Plugin {

  static get help() { return 'loop = <var [= initialvalue]> [to|in] [value|{values}|resource:sheet]'; }

  static get snippets() {
    return [`
snippet loop
\tloop = <\${1:i} = \${2:1}> to \${3:10}
\t\t\${4}
\tendloop

snippet loopin
\tloop = <\${1:item}> in { \${2} }
\t\t\${3}
\tendloop
`];
  }

}