
import _ from 'lodash';

import { DecklangParser } from '../src/decklang/decklangparser';
import { DecklangState } from '../src/decklang/decklangstate';

export const parse = (script) => new DecklangParser({ script }).parse();
export const parseAndFirst = (script) =>  parse(script)[0];

export const run = (script) => {
  const parser = new DecklangParser({ script });
  const instructions = parser.parse();
  const state = new DecklangState();
  parser.runInstructions(state, state.internalState, instructions);
  return state.internalState;
};

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