
require('babel-register');
const DecklangParser = require('../../src/decklang/decklangparser').DecklangParser;

const testDeck = `
\` This is a comment.

[NoAssign]="Test"
[FontName] = "Arial"
 [BigFont]  = "Arial", 16px, BU, #f0f0f0

unit = px
font = [BigFont]
font = [FontName], 16pt, BU, #f0f0f0 \` test comment

border = dotted, #c0c0c0
border = dotted, #c0c0c0, 1.5
border = dotted, , 1.5

font = "Arial", 16mm, BU, #0a0a0a

text = 1, "String", 1.5, 1.5, 10, 2
text = 2, "String", 0, 0, 10, 2, center
text = 3, "String", 0, 0, 10, 2, center, top
text = 4, "String", 0, 0, 10, 2, , top
`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.log(newParser.parse());
} catch(parseError) {
  console.error(parseError);
}