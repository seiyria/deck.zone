import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `cardsperpage = 1`
];

const failCases = [
  `cardsperpage`,
  `cardsperpage = `,
  `cardsperpage = -1`,
  `cardsperpage = a`
];

test(`cardsperpage directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`cardsperpage directive data is pulled correctly`, t => {
  const { call, cardCount } = parseAndFirst(`cardsperpage = 2`);

  t.true(call === 'cardsperpage');
  t.true(cardCount === 2)
});