
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

    try {
      const newParser = new DecklangParser({ script: currentScript.contents });
      const instructions = newParser.parse();

      _.each(instructions, instruction => {
        this.state.runPlugin(newState, instruction.call, instruction);
      });

      this.state.internalState = newState;

    } catch(e) {
      console.error(e);
    }
  }

}