
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
text = 1, "String", 0, 0, 10, 2, top
font = "Arial", 16, BU, #0a0a0a

loop = <x = 3> to 13
font = [BigFont]
endloop

[Max] = 20
loop = <x = 0> to [Max]
text = <x>, "Test<x>", 0, <x>, 1, 2
endloop

loop = <x = 3> to 13
text = <x + 1>, "Test<x - 1>", 0, <x * 2>, 1, 2
endloop

`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.log(newParser.parse());
} catch(parseError) {
  console.error(parseError);
  var string = '';
  for(var i = parseError.offset-20; i < parseError.offset + 20; i++) {
    if(i == parseError.offset) string += "**";
    string += testDeck[i];
    if(i == parseError.offset) string += "**";
  }
  console.log("Offending area: " + string);
}
