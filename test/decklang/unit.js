import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `unit = cm`
];

const failCases = [
  `unit`,
  `unit = `
];

test(`unit directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`unit directive data is pulled correctly`, t => {
  const { call, unit } = parseAndFirst(`unit = cm`);

  t.true(call === 'unit');
  t.true(unit === 'cm');
});