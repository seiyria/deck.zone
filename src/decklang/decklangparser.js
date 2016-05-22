
import grammar from './decklang';
import nearley from 'nearley';
import _ from 'lodash';

const REGEXES = {
  comment:             /\s*`.+$/gm,
  variableDeclaration: /^\s*\[(\w+)]\s*=\s*(.+)$/gm
};

export class DecklangParser {

  constructor({ script }) {
    this.parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    this.script = script;
    this.variables = {};
  }

  parse() {
    return this.results(this.preParse());
  }

  preParse() {
    let script = this.script;
    script = this.removeComments(script);
    script = this.pullVariables(script);
    script = this.assignVariables(script);
    return script;
  }

  assignVariables(script) {
    _.each(_.keys(this.variables), variable => {
      script = script.split(`[${variable}]`).join(this.variables[variable]);
    });
    return script;
  }

  pullVariables(script) {
    let result;
    while(result = REGEXES.variableDeclaration.exec(script)) {
      const [, varName, value] = result;
      this.variables[varName] = value;
    }
    return script.replace(REGEXES.variableDeclaration, '');
  }

  removeComments(script) {
    return script.replace(REGEXES.comment, '');
  }

  results(script) {
    return _(this.parser.feed(script).results[0]).flattenDeep().compact().value();
  }
}