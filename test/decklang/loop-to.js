import test from 'ava';
import { testPassFailCases, parseAndFirst, run } from '../_helpers';

const passCases = [
  `
  loop = <x = 0> to 10
    text = <x + (1 + 1) + 1>, "T <x>", 0, <x+1>, 1, 1
  endloop`,
  `
  loop = <x = 0> to 10
    loop = <y = 0> to <x>
      text = <x>, "T <x>", 0, <x+1>, 1, 1
    endloop
  endloop`
];

const failCases = [
  `loop`,
  `loop = `,
  `loop = <x>`,
  `loop = <x> to 10`,
  `loop = <x = 0> to 10`
];

const loopTest = ['loop = <x = 0> to 2', 'text = <x>, "T <x>", 0, <x+1>, 1, 1', 'endloop'].join('\n');

test(`loopTo construct is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`loopTo construct data is pulled correctly`, t => {
  const ran = parseAndFirst(loopTest);

  t.true(ran.loopStart.start.varName === 'x');
  t.true(ran.loopStart.start.varStart === 0);
  t.true(ran.loopStart.end === 2);
  t.true(ran.ops.length === 1);
});

test(`loopTo construct data is parsed correctly`, t => {
  const ran = run(loopTest);

  const { texts } = ran.cards[0];
  const { index, string, x, y, w, h } = texts[0];

  t.true(index === 0);
  t.true(string === 'T 0');
  t.true(x.val === 0);
  t.true(y.val === 1);
  t.true(w.val === 1);
  t.true(h.val === 1);
});