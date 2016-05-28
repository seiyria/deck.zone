import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `text = 1, "String", 0, 0, 0, 0`,
  `text = 1, "String", 0, 0, 0, 0, center`,
  `text = 1, "String", 0, 0, 0, 0, center, middle`
];

const failCases = [

  // invalid cases
  `text"`,
  `text = 1"`,
  `text = 1, "String"`,
  `text = 1, "String", 0`,
  `text = 1, "String", 0, 0`,
  `text = 1, "String", 0, 0, 0`,

  // bad arguments
  `text = 1,, 0, 0, 0, 0`,
  `text = -1, "String", 0, 0, 0, 0`,
  `text = 1, String, 0, 0, 0, 0`,
  `text = 1, "String", -1, 0, 0, 0`,
  `text = 1, "String", 0, -1, 0, 0`,
  `text = 1, "String", 0, 0, -1, 0`,
  `text = 1, "String", 0, 0, 0, -1`
];

test(`text directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`text directive data is pulled correctly`, t => {
  const { call, index, string, x, y, w, h, horizAlign, vertAlign } = parseAndFirst(`text = 1, "String", 1px, 2cm, 3, 4, center, middle`);

  t.true(call === 'text');
  t.true(index === 1);
  t.true(string === 'String');
  t.true(x.val === 1);
  t.true(x.unit === 'px');
  t.true(y.val === 2);
  t.true(y.unit === 'cm');
  t.true(w.val === 3);
  t.true(w.unit === undefined);
  t.true(h.val === 4);
  t.true(h.unit === undefined);
  t.true(horizAlign === 'center');
  t.true(vertAlign === 'middle');
});