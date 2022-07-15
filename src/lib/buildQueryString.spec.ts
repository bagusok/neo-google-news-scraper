import test from 'ava';

import { buildQueryString } from './buildQueryString';

test('buildQueryString', (t) => {
  t.is(
    buildQueryString({ hl: 'hi', gl: 'IN', ceid: 'IN:hi' }),
    'hl=hi&gl=IN&ceid=IN:hi'
  );
});
