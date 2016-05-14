
const grammar = require('./decklang');
const nearley = require('nearley');

export class DecklangParser {

  constructor({ script }) {
    this.parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    this.script = script;
  }

  parse() {
    let script = this.script;
    script = this.removeComments(script);
    return this.results(script);
  }

  removeComments(script) {
    const commentRegex = /^\s*#.+$/gm;
    return script.replace(commentRegex, '');
  }

  results(script) {
    return this.parser.feed(script).results[0];
  }
}