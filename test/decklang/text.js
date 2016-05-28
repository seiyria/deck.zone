import test from 'ava';
import { testPassFailCases } from '../_helpers';

const passCases = [
  `text = 1, "String", 0, 0, 0, 0`,
  `text = 1, "String", 0, 0, 0, 0, center`,
  `text = 1, "String", 0, 0, 0, 0, center, middle`
];

const failCases = [

  // invalid cases
  `text"`,
  `text = 1"`,
  `text = 1, "String"`,
  `text = 1, "String", 0`,
  `text = 1, "String", 0, 0`,
  `text = 1, "String", 0, 0, 0`,

  // bad arguments
  `text = -1, "String", 0, 0, 0, 0`,
  `text = 1, String, 0, 0, 0, 0`,
  `text = 1, "String", -1, 0, 0, 0`,
  `text = 1, "String", 0, -1, 0, 0`,
  `text = 1, "String", 0, 0, -1, 0`,
  `text = 1, "String", 0, 0, 0, -1`
];

test(`text directive is parsed correctly`, t => {

  testPassFailCases(t, passCases, failCases);

});