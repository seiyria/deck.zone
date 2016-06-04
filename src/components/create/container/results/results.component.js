
import { Component } from '@angular/core';
import template from './results.html';
import './results.less';
import { ProjectComponent } from '../project.component';

import { VsFor } from 'ng2-vs-for/src/ng2-vs-for';

import * as Components from '../../../../decklang/components/_components';

import _ from 'lodash';

import { StorageService } from 'ng2-storage';

import { DecklangParser } from '../../../../decklang/decklangparser';
import { DecklangState } from '../../../../decklang/decklangstate';

@Component({
  selector: 'results',
  providers: [StorageService],
  directives: [..._.values(Components), VsFor],
  inputs: ['project', 'projectId', 'displayScript', 'usePageStyle'],
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

  addPagePrintRules(state) {
    const PAGE_ID = '__page_rules';

    const oldPageStyle = document.getElementById(PAGE_ID);
    if(oldPageStyle) oldPageStyle.remove();

    const style = document.createElement('style');
    style.id = PAGE_ID;
    style.appendChild(document.createTextNode(''));
    document.head.appendChild(style);

    const { page } = state.options;

    style.innerHTML = `
      @media print {
        html, body, .printable, .results-pane, .embed-view {
          width: ${page.width} !important;
          height: ${page.height} !important;
        }

        @page {
          size: ${page.width} ${page.height};
          margin-top: ${page['margin-top']};
          margin-left: ${page['margin-left']};
          margin-right: ${page['margin-right']};
          margin-bottom: ${page['margin-bottom']};
        }
      }
    `;
  }

  renderScript(currentScript) {

    const newState = this.state.newState();
    const newParser = new DecklangParser({ script: currentScript.contents });

    try {
      const instructions = newParser.parse();

      newParser.runInstructions(this.state, newState, instructions);

      this.state.internalState = newState;
      this.addPagePrintRules(newState);

    } catch(e) {
      console.error(e);
      console.error('Error near', newParser.preParse().substring(e.offset - 5, e.offset + 5));
    }
  }

  ngOnChanges(data) {
    const changed = super.ngOnChanges(data);
    if(!changed) return;

    // don't render if the result window is hidden
    if(this.storage.hideResult && !this.displayScript) return;

    const currentScript = this.internalProject.scripts[this.displayScript || this.internalProject.activeScript];

    this.renderScript(currentScript);
  }

}