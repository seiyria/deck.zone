
import { Component } from '@angular/core';
import template from './results.html';
import './results.less';
import { ProjectComponent } from '../project.component';

import { VsFor } from 'ng2-vs-for/src/ng2-vs-for';

import * as Components from '../../../../decklang/plugins/_components';

import _ from 'lodash';

import { StorageService } from 'ng2-storage';

import { DecklangParser } from '../../../../decklang/decklangparser';
import { DecklangState } from '../../../../decklang/decklangstate';

@Component({
  selector: 'results',
  providers: [StorageService],
  directives: [..._.values(Components), VsFor],
  inputs: ['project', 'projectId', 'api'],
  template
})
export class ResultsComponent extends ProjectComponent {

  static get parameters() {
    return [[StorageService]];
  }

  constructor(storage) {
    super();
    this.storage = storage.local;
    this.state = new DecklangState();
  }

  ngOnChanges(data) {
    super.ngOnChanges(data);

    // don't render if the result window is hidden
    if(this.storage.hideResult) return;

    const project = data.project.currentValue;
    if(!project) return;

    const currentScript = project.scripts[project.activeScript];

    const newState = this.state.newState();

    const runInstructions = (instructions, scope = {}) => {
      _.each(instructions, instruction => {

        // clone otherwise the objects in arrays are the same ref
        const clonedInstruction = _.cloneDeep(instruction);

        if(!clonedInstruction.ops) {
          this.state.runPlugin(newState, clonedInstruction, scope);
          return;
        }

        // early loop termination if there are no ops
        if(clonedInstruction.ops.length === 0) {
          return;
        }

        const { start, iterations, end } = clonedInstruction.loopStart;
        const { varStart, varName } = start;

        const newScope = _.cloneDeep(scope);

        // for...to loop
        if(_.isNumber(varStart) && _.isNumber(end)) {

          if(varStart > end) throw new Error('Loop start must be lower than the end value');

          for(let i = varStart; i <= end; i++) {
            newScope[varName] = i;
            runInstructions(clonedInstruction.ops, _.cloneDeep(newScope));
          }

        // for...in loop
        } else if(iterations) {

          _.each(iterations, (iteration, index) => {
            newScope[varName] = iteration;
            newScope[`${varName}_index`] = index;
            runInstructions(clonedInstruction.ops, _.cloneDeep(newScope));
          });

        // not sure if this can even happen
        } else {
          throw new Error('Invalid loop settings.');
        }

      });
    };

    const newParser = new DecklangParser({ script: currentScript.contents });

    try {
      const instructions = newParser.parse();

      runInstructions(instructions);

      // remove null entries when displaying cards
      newState.cards = _.compact(newState.cards);
      this.state.internalState = newState;

    } catch(e) {
      console.error(e);
      console.error('Error near', newParser.preParse().substring(e.offset - 5, e.offset + 5));
    }

  }

}