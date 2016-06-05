import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardsperpage = 1, 2`
];

const failCases = [
  `cardsperpage`,
  `cardsperpage = `,
  `cardsperpage = -1`,
  `cardsperpage = a`,
  `cardsperpage = 1, `
];

test(`cardsperpage directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardsperpage directive data is pulled correctly`, t => {
  const { call, cardsPerRow, rowsPerPage } = parseAndFirst(`cardsperpage = 1, 2`);

  t.true(call === 'cardsperpage');
  t.true(cardsPerRow === 1);
  t.true(rowsPerPage === 2);
});