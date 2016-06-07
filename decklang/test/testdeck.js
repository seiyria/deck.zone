
require('babel-register');
const DecklangParser = require('../../src/decklang/decklangparser').DecklangParser;

const testDeck = `
\`font = "Arial", 16, B

\`text = 1, "Main Card", 2, 2, 1, 1

\`loop = <x = 1> to 5
\`  text = <x>, "Title <x>", 0, 0, 3, 1
\`  text = <x>, "Subtitle <x>", 0, 1, 3, 1
\`  text = <x>, "Subtitle2 <x>", 0, 2, 3, 1

\`  loop = <y = 0> to 2
\`    text = <x>, "Test <x> <y> (<x+y>)", 0, <3 + x + y>, 1, 3
\`  endloop

\`  text = <x>, "Megasubtitle <x>", 0, 7, 5, 1

\`endloop

\`loop = <x> in { "Mage": 1, "Cleric": 2, "Warrior": 2, "Thief": 1 }
\`  loop = <y = 1> to <x_value>

\`    text = <y + (3 * x_index)>, "<x> (<x_index>)", 0, <x_index>, 3, 3

\`  endloop
\`endloop

border = dotted, #000
border = dotted, #000, 1
border = dotted,,1cm
font = "Arial", 16, BU, #000
font = "Arial", 16, BU, #000
text = 1, "String", 0, 0, 2px, 2
cardsize=5px, 10px
cardsize=5, 10
pagesize = 5, 10
pagemargins=5px
pagemargins=5px,6px,7px,8px
cardsperpage=9, 9
pagesize = letter

loop = <x:t = 1> to 5
  text=<x:t+1+(1+1)+1>, "test", 0, 0, 0, 0
endloop
cardside=back

image = 1, "<<spade-skull>>", 0, 0, 0, 0

loop = <row> in <<xslxvar>>:"Mage"
endloop

loop = <x> in { "Mage", "Cleric" }
  loop = <row> in <<xslxvar2>>:<x>
    text = <x_index + row_index>, "<row_Name>", 0, 0, 0, 0
  endloop
endloop
`;

const newParser = new DecklangParser({ script: testDeck });

try {
  console.log(testDeck);
  console.dir(newParser.parse(), { depth: null });
} catch(parseError) {
  console.error(parseError);
  console.error('Error near', newParser.preParse().substring(parseError.offset - 5, parseError.offset + 5));
}