
var grammar = require('../../src/decklang/decklang');
var nearley = require('nearley');
var _ = require('lodash');

var testDeck = `
text = 1, "String", 0, 0, 10, 2
font = "Arial", 16, BU, #0a0a0a
`;

// TODO figure out why using the same parser object causes an error

_.each(testDeck, testString => {

  var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

  try {
    console.log(`Parsing: ${testString}`);
    console.log(parser.feed(testString).results[0][0]);
  } catch(parseError) {
    console.error(parseError);
  }
});