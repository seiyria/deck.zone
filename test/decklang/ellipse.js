import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `ellipse = 1, 0, 0, 0, 0`,
  `ellipse = 1, 0, 0, 0, 0, 3px`,
  `ellipse = 1, 0, 0, 0, 0, 3px, #000`,
  `ellipse = 1, 0, 0, 0, 0, 3px, #000, #000`,
  `ellipse = 1, 0, 0, 0, 0,, #000, #000`,
  `ellipse = 1, 0, 0, 0, 0, 3px, #000`,
  `ellipse = 1, 0, 0, 0, 0, 3px,, #000`
];

const failCases = [

  // invalid cases
  `ellipse"`,
  `ellipse = 1"`,
  `ellipse = 1,`,
  `ellipse = 1, 0`,
  `ellipse = 1, 0, 0`,
  `ellipse = 1, 0, 0, 0`
];

test(`ellipse directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`ellipse directive data is pulled correctly`, t => {
  const { call, index, x, y, w, h, thickness, outerColor, innerColor } = parseAndFirst(`ellipse = 1, 2px, 3cm, 4, 5, 3px, #000, #f00`);

  t.true(call === 'ellipse');
  t.true(index === 1);

  t.true(x.val === 2);
  t.true(x.unit === 'px');
  t.true(y.val === 3);
  t.true(y.unit === 'cm');
  t.true(w.val === 4);
  t.true(w.unit === undefined);
  t.true(h.val === 5);
  t.true(h.unit === undefined);
  t.true(thickness.val === 3);
  t.true(thickness.unit === 'px');
  t.true(outerColor === '#000');
  t.true(innerColor === '#f00');
});