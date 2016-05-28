import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `font = "Arial", 16`,
  `font = "Arial", 16pt`,
  `font = "Arial", 16pt, B`,
  `font = "Arial", 16pt, BUI`,
  `font = "Arial", 16pt,, #000`
];

const failCases = [

  // invalid cases
  `font`,
  `font = `,
  `font = Arial`,
  `font = Arial, -10`,
  `font = Arial, -10px`
];

test(`font directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`font directive data is pulled correctly`, t => {
  const { call, family, css, decoration, color } = parseAndFirst(`font = "Arial", 16pt, BUI, #000`);

  t.true(call === 'font');
  t.true(family === 'Arial');
  t.true(css.val === 16);
  t.true(css.unit === 'pt');
  t.true(decoration === 'B,U,I');
  t.true(color === '#000');
});