
require('babel-register');
const DecklangParser = require('../../src/decklang/decklangparser').DecklangParser;

const testDeck = `
\` This is a comment.
text = 1, "String", 0, 0, 10, 2 \` This does text things
font = "Arial", 16, BU, #0a0a0a
`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.log(newParser.parse());
} catch(parseError) {
  console.error(parseError);
}