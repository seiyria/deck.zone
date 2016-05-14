
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import template from './creator.html';
import './creator.less';
import { ProjectComponent } from '../project.component';

import { AceEditorDirective } from 'ng2-ace';

import 'brace/theme/clouds';
import '../../../../decklang/ace';

import _ from 'lodash';

@Component({
  selector: 'creator',
  inputs: ['projectId', 'project', 'api'],
  directives: [AceEditorDirective, NgClass],
  template
})
export class CreatorComponent extends ProjectComponent {

  constructor() {
    super();

    const writeFile = _.debounce((data, index) => {
      this.api.writeFile(data, index);
    }, 5000);

    this.onChange = (data, index) => {
      writeFile(data, index);
    }
  }

  ngOnChanges(data) {
    const projectData = data.project.currentValue;
    if(!projectData) return;

    this.activeScriptId = projectData.activeScript;

    // don't refresh view if just text changes
    const numFiles = _.keys(projectData.scripts).length;
    if(numFiles === this.oldFileCount) return;
    this.oldFileCount = numFiles;

    super.ngOnChanges(data);
    this._scriptList = _(this.internalProject.scripts).keys().map(key => ({key, script: this.internalProject.scripts[key] })).value();
  }

}