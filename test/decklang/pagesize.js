import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `pagesize = 16, 16`,
  `pagesize = 700cm, 16`,
  `pagesize = 16, 700cm`
];

const failCases = [
  `pagesize`,
  `pagesize = `
];

test(`pagesize directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`pagesize directive data is pulled correctly`, t => {
  const { call, width, height } = parseAndFirst(`pagesize = 16, 700cm`);

  t.true(call === 'pagesize');
  t.true(width.val === 16);
  t.true(width.unit === undefined);
  t.true(height.val === 700);
  t.true(height.unit === 'cm');
});