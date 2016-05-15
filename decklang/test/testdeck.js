
require('babel-register');
const DecklangParser = require('../../src/decklang/decklangparser').DecklangParser;

const testDeck = `
\` This is a comment.

[NoAssign]="Test"
[FontName] = "Arial"
 [BigFont]  = "Arial", 16, BU, #f0f0f0

font = [BigFont]
font = [FontName], 16, BU, #f0f0f0 \` test comment

text = 1, "String", 0, 0, 10, 2
text = 1, "String", 0, 0, 10, 2, center
text = 1, "String", 0, 0, 10, 2, center, top
text = 1, "String", 0, 0, 10, 2, , top
font = "Arial", 16, BU, #0a0a0a
`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.log(newParser.parse());
} catch(parseError) {
  console.error(parseError);
}