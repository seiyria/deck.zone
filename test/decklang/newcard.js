import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `newcard = "testcardindex"`
];

const failCases = [
  `newcard`,
  `newcard = `
];

test(`newcard directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`newcard directive data is pulled correctly`, t => {
  const { call, name } = parseAndFirst(`newcard = "testcardindex"`);

  t.true(call === 'newcard');
  t.true(name === 'testcardindex');
});