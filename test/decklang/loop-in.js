import test from 'ava';
import { testPassFailCases, parseAndFirst, run } from '../_helpers';

const passCases = [
  `
  loop = <x> in { "Test", 1, 2, 3 }
    text = <x_index>, "<x>", 0, 0, 1, 1
  endloop`
];

const failCases = [
  `loop`,
  `loop = `,
  `loop = <x> in {}`,
  `loop = <x = 0> in { 1 }`
];

const loopTest = ['loop = <x> in { "Test", 1, 2, 3 }', 'text = <x_index>, "<x>", 0, 0, 1, 1', 'endloop'].join('\n');

test(`loopIn construct is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`loopIn construct data is pulled correctly`, t => {
  const ran = parseAndFirst(loopTest);

  t.true(ran.loopStart.start.varName === 'x');
  t.true(ran.loopStart.iterations.length === 4);
  t.true(ran.loopStart.iterations[0].key === 'Test');
  t.true(ran.loopStart.iterations[1].key === 1);

  t.true(ran.ops.length === 1);
});

test(`loopIn construct data is parsed correctly`, t => {
  const ran = run(loopTest);

  const { texts } = ran.cards[0];
  const { index, string, x, y, w, h } = texts[0];

  t.true(index === 0);
  t.true(string === 'Test');
  t.true(x.val === 0);
  t.true(y.val === 0);
  t.true(w.val === 1);
  t.true(h.val === 1);
});