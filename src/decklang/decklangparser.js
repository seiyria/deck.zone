
import { Plugin } from './_base/_plugin';

import grammar from './decklang';
import nearley from 'nearley';
import _ from 'lodash';

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

  preParse() {
    let script = this.script;
    script = this.removeComments(script);
    script = this.pullVariables(script);
    script = this.assignVariables(script);
    return script;
  }

  assignVariables(script) {
    _.each(_.keys(this.variables), variable => {
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

  results(script) {
    return _(this.parser.feed(script).results[0]).flattenDeep().compact().value();
  }

  runInstructions(wrapState, state, instructions, scope = {}) {
    _.each(instructions, instruction => {

      // clone otherwise the objects in arrays are the same ref
      const clonedInstruction = _.cloneDeep(instruction);

      if(!clonedInstruction.ops) {
        wrapState.runPlugin(state, clonedInstruction, scope);
        return;
      }

      // early loop termination if there are no ops
      if(clonedInstruction.ops.length === 0) {
        return;
      }

      const { start, iterations, end } = clonedInstruction.loopStart;
      const { varStart, varName, resourceId, sheet } = start;

      const newScope = _.cloneDeep(scope);
      const endEval = end && end.eval ? Plugin.scopeEval(end.eval, scope) || 0 : end;

      // for...to loop
      if(_.isNumber(varStart) && _.isNumber(endEval)) {

        if (varStart > endEval) throw new Error('Loop start must be lower than the end value');

        for (let i = varStart; i <= endEval; i++) {
          newScope[varName] = i;
          this.runInstructions(wrapState, state, clonedInstruction.ops, _.cloneDeep(newScope));
        }

      // for...in loop with resources
      } else if(sheet && resourceId) {
        const sheetEval = sheet && sheet.eval ? Plugin.scopeEval(sheet.eval, scope) : sheet;

        const curResource = newScope[`resource:${resourceId}`];

        if(!curResource) {
          throw new Error(`Resource ${resourceId} does not exist.`);
        }

        const curSheetItems = curResource[sheetEval];

        _.each(curSheetItems.elements, (element, index) => {
          newScope[`${varName}_index`] = index;
          newScope[`${varName}_length`] = curSheetItems.elements.length;

          _.each(curSheetItems.original_columns, column => {
            newScope[`${varName}_${column}`] = element[curSheetItems.pretty_columns[column]];
          });

          this.runInstructions(wrapState, state, clonedInstruction.ops, _.cloneDeep(newScope));
        });

      // for...in loop
      } else if(iterations) {

        _.each(iterations, (iteration, index) => {
          newScope[varName] = iteration.key;
          newScope[`${varName}_value`] = iteration.val;
          newScope[`${varName}_index`] = index;
          newScope[`${varName}_length`] = iterations.length;
          this.runInstructions(wrapState, state, clonedInstruction.ops, _.cloneDeep(newScope));
        });

        // not sure if this can even happen
      } else {
        throw new Error('Invalid loop settings.');
      }

    });

    // remove null entries for displaying cards
    state.cards.front = _.compact(state.cards.front);
    state.cards.back = _.compact(state.cards.back);
  }
}