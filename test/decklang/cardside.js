import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardside = front`,
  `cardside = back`
];

const failCases = [
  `cardside`,
  `cardside = `,
  `cardside = left`
];

test(`cardside directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardside directive data is pulled correctly`, t => {
  const { call, side } = parseAndFirst(`cardside = front`);

  t.true(call === 'cardside');
  t.true(side === 'front')
});