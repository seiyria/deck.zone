
import _ from 'lodash';

import { DecklangParser } from '../src/decklang/decklangparser';

export const testPassFailCases = (t, passCases = [], failCases = []) => {

  _.each(passCases, test => {

    const newParser = new DecklangParser({ script: test });

    try {
      const results = newParser.parse();

      t.true(results.length > 0);
    } catch(e) {
      t.fail(test);
    }

  });

  _.each(failCases, test => {

    const newParser = new DecklangParser({ script: test });

    try {
      const results = newParser.parse();

      t.true(results.length === 0);
    } catch(e) {
      t.pass(test);
    }

  });
};