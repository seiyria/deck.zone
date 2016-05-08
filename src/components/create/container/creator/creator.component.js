
import { Component } from 'angular2/core';
import { NgClass } from 'angular2/common';
import template from './creator.html';
import './creator.less';
import { ProjectComponent } from '../project.component';

import { AceEditorDirective } from 'ng2-ace';

@Component({
  selector: 'creator',
  inputs: ['projectId', 'project', 'api'],
  directives: [AceEditorDirective, NgClass],
  template
})
export class CreatorComponent extends ProjectComponent {

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

  onChange(data, index) {
    this.api.writeFile(data, index);
  }

}