import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardsize = 16, 16`,
  `cardsize = 700cm, 16`,
  `cardsize = 16, 700cm`
];

const failCases = [
  `cardsize`,
  `cardsize = `
];

test(`cardsize directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardsize directive data is pulled correctly`, t => {
  const { call, width, height } = parseAndFirst(`cardsize = 16, 700cm`);

  t.true(call === 'cardsize');
  t.true(width.val === 16);
  t.true(width.unit === undefined);
  t.true(height.val === 700);
  t.true(height.unit === 'cm');
});