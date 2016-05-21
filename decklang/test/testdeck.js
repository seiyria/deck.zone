
require('babel-register');
const DecklangParser = require('../../src/decklang/decklangparser').DecklangParser;

const testDeck = `
text = 1, "Main Card", 2, 2, 1, 1

loop = <x = 1> to 5
  text = <x>, "Title <x>", 0, 0, 3, 1
  text = <x>, "Subtitle <x>", 0, 1, 3, 1
  text = <x>, "Subtitle2 <x>", 0, 2, 3, 1

  loop = <y = 0> to 2
    text = <x>, "Test <x> <y> (<x+y>)", 0, <3 + x + y>, 1, 3
  endloop

  text = <x>, "Megasubtitle <x>", 0, 7, 5, 1

endloop
`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.dir(newParser.parse(), { depth: null });
} catch(parseError) {
  console.error(parseError);
  console.error('Error near', testDeck.substring(parseError.offset - 5, parseError.offset + 5));
}