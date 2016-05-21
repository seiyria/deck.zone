
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

    console.log('change')

    // don't render if the result window is hidden
    if(this.storage.hideResult) return;

    const project = data.project.currentValue;
    if(!project) return;

    const currentScript = project.scripts[project.activeScript];

    const newState = this.state.newState();

    const runInstructions = (instructions, scope = {}) => {
      _.each(instructions, instruction => {

        if(!instruction.ops) {
          console.log('leaf: ', instruction.call, instruction, JSON.stringify(scope))
          this.state.runPlugin(newState, instruction, scope);
          return;
        }

        const vars = instruction.loopStart;
        const newScope = _.cloneDeep(scope);

        if(vars.start.value > vars.end) throw new Error('Loop start must be lower than the end value');

        for(let i = vars.start.value; i <= vars.end; i++) {
          newScope[vars.start.varName] = i;

          runInstructions(instruction.ops, newScope);
          console.log('done with', instruction)
        }
      });
    };

    try {
      const newParser = new DecklangParser({ script: currentScript.contents });
      const instructions = newParser.parse();

      console.log(instructions);
      runInstructions(instructions);
      console.log('done')

      this.state.internalState = newState;

    } catch(e) {
      console.error(e);
    }

    console.log(this.state.internalState);
  }

}