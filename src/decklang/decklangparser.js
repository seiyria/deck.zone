
import { Plugin } from './_base/_plugin';

import grammar from './decklang';
import nearley from 'nearley';

import _ from 'lodash';

import DecklangWorker from './decklang.worker';


const REGEXES = {
  comment:             /\s*`.+$/gm,
  variableDeclaration: /^\s*\[(\w+)]\s*=\s*(.+)$/gm
};

export class DecklangParser {

  constructor({ script }) {
    this.parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
    this.script = script;
    this.variables = {};
  }

  parse() {
    return this.results(this.preParse());
  }

  workerParse() {
    return this.workerResults(this.preParse());
  }

  preParse() {
    let script = this.script;
    script = this.removeComments(script);
    script = this.pullVariables(script);
    script = this.assignVariables(script);
    return script;
  }

  assignVariables(script) {
    Object.keys(this.variables).forEach(variable => {
      script = script.split(`[${variable}]`).join(this.variables[variable]);
    });
    return script;
  }

  pullVariables(script) {
    let result;
    while((result = REGEXES.variableDeclaration.exec(script))) {
      const [, varName, value] = result;
      this.variables[varName] = value;
    }
    return script.replace(REGEXES.variableDeclaration, '');
  }

  removeComments(script) {
    return script.replace(REGEXES.comment, '');
  }

  workerResults(script) {
    return new Promise((resolve, reject) => {
      
      const worker = new DecklangWorker();
      
      worker.onmessage = (msg) => {
        if(msg.data.error) {
          return reject(msg.data.error);
        }

        resolve(_(msg.data[0]).flattenDeep().compact().value());
      };

      worker.postMessage(script);
    });
  }

  results(script) {
    const instructions = this.parser.feed(script).results[0];
    return _(instructions).flattenDeep().compact().value();
  }

  countResults() {
    const script = this.preParse();
    const instructions = this.parser.feed(script).results;
    return instructions.length;
  }

  getCheckResult({ left, operator, right }, scope) {

    const leftEval = Plugin.eval(left, scope);
    const rightEval = Plugin.eval(right, scope);

    switch(operator) {
    case '>':   return leftEval > rightEval;
    case '>=':  return leftEval >= rightEval;
    case '==':  return leftEval == rightEval;
    case '!=':  return leftEval != rightEval;
    case '<=':  return leftEval <= rightEval;
    case '<':   return leftEval < rightEval;
    default:    return false;
    }
  }

  runInstructions(wrapState, state, instructions, scope = {}) {

    // used to track the number of ops that have elapsed so far, linearly (used for layering)
    let blockLevelOps = scope.blockLevelOps || 0;

    // used to have a scope that is passed from one op to the next in a loop instead of having it be mutable
    let nextScope = scope;

    instructions.forEach(instruction => {

      // clone otherwise the objects in arrays are the same ref
      const clonedInstruction = _.clone(instruction);
      const newScope = _.clone(nextScope);

      blockLevelOps++;
      newScope.blockLevelOps = blockLevelOps;

      if(!clonedInstruction.ops) {
        wrapState.runPlugin(state, clonedInstruction, newScope);
        nextScope = newScope;
        return;
      }

      // early loop termination if there are no ops
      if(clonedInstruction.ops.length === 0) {
        return;
      }

      // loop statements
      if(clonedInstruction.loopStart) {

        const { start, iterations, end } = clonedInstruction.loopStart;
        const { varStart, varName, resourceId, sheet } = start;

        const endEval = Plugin.eval(end, newScope) || 0;

        // for...to loop
        if(_.isNumber(varStart) && _.isNumber(endEval)) {

          if (varStart > endEval) return; // throw new Error(`Loop start must be lower than the end value (given ${varStart}, ${endEval})`);

          for (let i = varStart; i <= endEval; i++) {
            newScope[varName] = i;
            this.runInstructions(wrapState, state, clonedInstruction.ops, newScope);
          }

          blockLevelOps += clonedInstruction.ops.length;
          newScope.blockLevelOps = blockLevelOps;

          // for...in loop with resources
        } else if(sheet && resourceId) {
          const sheetEval = Plugin.eval(sheet, newScope);

          const curResource = newScope[`resource:${resourceId}`];

          if(!curResource) {
            throw new Error(`Resource ${resourceId} does not exist.`);
          }

          if(!curResource[sheetEval]) {
            throw new Error(`Spreadsheet ${resourceId} could not be loaded correctly.`);
          }

          const curSheetItems = curResource[sheetEval];

          newScope[`${varName}_length`] = curSheetItems.elements.length;

          curSheetItems.elements.forEach((element, index) => {
            newScope[`${varName}_index`] = index;

            curSheetItems.originalColumns.forEach(column => {
              newScope[`${varName}_${column}`] = element[curSheetItems.prettyColumns[column]];
              newScope[`${varName}_${curSheetItems.prettyColumns[column]}`] = newScope[`${varName}_${column}`];
            });

            this.runInstructions(wrapState, state, clonedInstruction.ops, _.clone(newScope));
          });

          // for...in loop
        } else if(iterations) {

          newScope[`${varName}_length`] = iterations.length;

          iterations.forEach((iteration, index) => {
            newScope[varName] = iteration.key;
            newScope[`${varName}_value`] = iteration.val;
            newScope[`${varName}_index`] = index;

            this.runInstructions(wrapState, state, clonedInstruction.ops, newScope);
          });

          blockLevelOps += clonedInstruction.ops.length;
          newScope.blockLevelOps = blockLevelOps;

        // not sure if this can even happen
        } else {
          throw new Error('Invalid loop settings.');
        }

      // check statements
      } else if(clonedInstruction.checkStart) {
        const result = this.getCheckResult(clonedInstruction.checkStart, newScope);
        if(!result) return;

        this.runInstructions(wrapState, state, clonedInstruction.ops, newScope);
        blockLevelOps += clonedInstruction.ops.length;
        newScope.blockLevelOps = blockLevelOps;

      }

    });

    // remove null entries for displaying cards
    state.cards.front = _.compact(state.cards.front);
    state.cards.back = _.compact(state.cards.back);
  }
}