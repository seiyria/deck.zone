import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `pagemargins = 16`,
  `pagemargins = 16, 16, 16, 16`,
  `pagemargins = 16px, 16pt, 16cm, 16mm`
];

const failCases = [
  `pagemargins`,
  `pagemargins =`,
  `pagemargins = -10`
];

test(`pagemargins directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`pagemargins directive data is pulled correctly in long form`, t => {
  const { call, top, left, right, bottom } = parseAndFirst(`pagemargins = 16px, 17pt, 18cm, 19mm`);

  t.true(call === 'pagemargins');
  t.true(left.val === 16);
  t.true(left.unit === 'px');
  t.true(right.val === 17);
  t.true(right.unit === 'pt');
  t.true(top.val === 18);
  t.true(top.unit === 'cm');
  t.true(bottom.val === 19);
  t.true(bottom.unit === 'mm');
});

test(`pagemargins directive data is pulled correctly in short form`, t => {
  const { call, top, left, right, bottom } = parseAndFirst(`pagemargins = 16px`);

  t.true(call === 'pagemargins');
  t.true(left.val === 16);
  t.true(left.unit === 'px');
  t.true(right.val === 16);
  t.true(right.unit === 'px');
  t.true(top.val === 16);
  t.true(top.unit === 'px');
  t.true(bottom.val === 16);
  t.true(bottom.unit === 'px');
});