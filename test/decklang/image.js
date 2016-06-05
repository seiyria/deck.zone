import test from 'ava';
import { testPassFailCases, parseAndFirst } from '../_helpers';

const passCases = [
  `image = 1, "http://site.com/image.png", 0, 0, 0, 0`
];

const failCases = [

  // invalid cases
  `image"`,
  `image = 1"`,
  `image = 1, "http://site.com/image.png"`,
  `image = 1, "http://site.com/image.png", 0`,
  `image = 1, "http://site.com/image.png", 0, 0`,
  `image = 1, "http://site.com/image.png", 0, 0, 0`,

  // bad arguments
  `image = 1,, 0, 0, 0, 0`,
  `image = -1, "http://site.com/image.png", 0, 0, 0, 0`,
  `image = 1, http://site.com/image.png, 0, 0, 0, 0`,
  `image = 1, "http://site.com/image.png", -1, 0, 0, 0`,
  `image = 1, "http://site.com/image.png", 0, -1, 0, 0`,
  `image = 1, "http://site.com/image.png", 0, 0, -1, 0`,
  `image = 1, "http://site.com/image.png", 0, 0, 0, -1`
];

test(`image directive is parsed correctly`, t => {
  testPassFailCases(t, passCases, failCases);
});

test(`image directive data is pulled correctly`, t => {
  const { call, index, url, x, y, w, h } = parseAndFirst(`image = 1, "http://site.com/image.png", 1px, 2cm, 3, 4`);

  t.true(call === 'image');
  t.true(index === 1);
  t.true(url === 'http://site.com/image.png');
  t.true(x.val === 1);
  t.true(x.unit === 'px');
  t.true(y.val === 2);
  t.true(y.unit === 'cm');
  t.true(w.val === 3);
  t.true(w.unit === undefined);
  t.true(h.val === 4);
  t.true(h.unit === undefined);
});