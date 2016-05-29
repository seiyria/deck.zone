import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `border = dotted`,
  `border = dotted, #000`,
  `border = dotted, #000, 1`,
  `border = dotted, #000, 1px`,
  `border = dotted, , 1pt`
];

const failCases = [
  `border`,
  `border =`
];

test(`border directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`border directive data is pulled correctly`, t => {
  const { call, style, color, width } = parseAndFirst(`border = dotted, #000, 1px`);

  t.true(call === 'border');
  t.true(style === 'dotted');
  t.true(color === '#000');
  t.true(width.val === 1);
  t.true(width.unit === 'px');
});