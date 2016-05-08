
import { Component, EventEmitter } from 'angular2/core';
import template from './createcontainer.html';
import { RouteParams, Router } from 'angular2/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CreatorComponent } from './creator/creator.component';

import { CurrentProjectService } from '../../../services/currentproject';

@Component({
  providers: [CurrentProjectService],
  directives: [SidebarComponent, ToolbarComponent, CreatorComponent],
  template
})
export class CreateContainerComponent {
  static get parameters() {
    return [[RouteParams], [Router], [CurrentProjectService]];
  }

  constructor(routeParams, router, currentProjectService) {
    this.projectId = routeParams.params.projectId;

    if(!this.projectId) {
      return router.navigate(['../../Home']);
    }

    this.projectData = currentProjectService.getContent(this.projectId);
    this.projectData._ref.on('value', snap => {
      const value = snap.val();
      if(value) return;
      router.navigate(['../Invalid', { projectId: this.projectId }]);
    });

    this.scriptList = currentProjectService.getScriptList(this.projectId);

    this.api = {
      changeActiveScript: (index)           => this.projectData._ref.child('activeScript').set(index),
      writeFile:          (contents, index) => this.projectData._ref.child('scripts').child(index).child('contents').set(contents),
      newFile:            (name)            => this.scriptList.push({ name, contents: '' }),
      deleteFile:         (index)           => this.projectData._ref.child('scripts').child(index).remove(),
      editFile:           (index, newName)  => this.projectData._ref.child('scripts').child(index).child('name').set(newName)
    };

  }
}