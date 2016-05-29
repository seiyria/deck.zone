import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardmargins = 16`,
  `cardmargins = 16, 16, 16, 16`,
  `cardmargins = 16px, 16pt, 16cm, 16mm`
];

const failCases = [
  `cardmargins`,
  `cardmargins =`,
  `cardmargins = -10`
];

test(`cardmargins directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardmargins directive data is pulled correctly in long form`, t => {
  const { call, top, left, right, bottom } = parseAndFirst(`cardmargins = 16px, 17pt, 18cm, 19mm`);

  t.true(call === 'cardmargins');
  t.true(left.val === 16);
  t.true(left.unit === 'px');
  t.true(right.val === 17);
  t.true(right.unit === 'pt');
  t.true(top.val === 18);
  t.true(top.unit === 'cm');
  t.true(bottom.val === 19);
  t.true(bottom.unit === 'mm');
});

test(`cardmargins directive data is pulled correctly in short form`, t => {
  const { call, top, left, right, bottom } = parseAndFirst(`cardmargins = 16px`);

  t.true(call === 'cardmargins');
  t.true(left.val === 16);
  t.true(left.unit === 'px');
  t.true(right.val === 16);
  t.true(right.unit === 'px');
  t.true(top.val === 16);
  t.true(top.unit === 'px');
  t.true(bottom.val === 16);
  t.true(bottom.unit === 'px');
});