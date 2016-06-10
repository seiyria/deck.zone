import test from 'ava';
import { testPassFailCases, parseAndFirst, run } from '../_helpers';

const passCases = [
  `
  check = 1 == 2
  endcheck
  `,
  `
  check = 1 != 2
  endcheck
  `,
  `
  check = 1 >= 2
  endcheck
  `,
  `
  check = 1 <= 2
  endcheck
  `,
  `
  check = 1 < 2
  endcheck
  `,
  `
  check = 1 > 2
  endcheck
  `
];

const failCases = [
  `check`,
  `check = `,
  `check = 1 >`,
  `check = 1 > 2`
];

const checkTest = ['check = 1 == 2', 'text = 1, "pass", 0, 0, 1, 1', 'endcheck'].join('\n');

test(`check construct is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`check construct data is pulled correctly`, t => {
  const ran = parseAndFirst(checkTest);

  t.true(ran.checkStart.operator === '==');
  t.true(ran.checkStart.left === 1);
  t.true(ran.checkStart.right === 2);

  t.true(ran.ops.length === 1);
});