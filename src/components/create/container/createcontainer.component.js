
import { Component, EventEmitter } from '@angular/core';
import template from './createcontainer.html';
import { RouteParams, Router } from '@angular/router-deprecated';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CreatorComponent } from './creator/creator.component';
import { ClaimerComponent } from './claimer/claimer.component';

import { CurrentProjectService } from '../../../services/currentproject';
import { TitleChangerService } from '../../../services/titlechanger';

@Component({
  providers: [CurrentProjectService, TitleChangerService],
  directives: [SidebarComponent, ToolbarComponent, CreatorComponent, ClaimerComponent],
  template
})
export class CreateContainerComponent {
  static get parameters() {
    return [[RouteParams], [Router], [CurrentProjectService], [TitleChangerService]];
  }

  constructor(routeParams, router, currentProjectService, titleChangerService) {
    this.projectId = routeParams.params.projectId;

    if(!this.projectId) {
      return router.navigate(['../../Home']);
    }

    this.projectData = currentProjectService.getContent(this.projectId);
    this.projectData._ref.on('value', snap => {
      const value = snap.val();
      if(value) {
        titleChangerService.changeTitle(value.name);
        return;
      }
      router.navigate(['../Invalid', { projectId: this.projectId }]);
    });

    this.scriptList = currentProjectService.getScriptList(this.projectId);

    this.api = {
      changeActiveScript: (index)           => this.projectData._ref.child('activeScript').set(index),
      writeFile:          (contents, index) => this.projectData._ref.child('scripts').child(index).child('contents').set(contents),
      newFile:            (name)            => this.scriptList.push({ name, contents: '' }),
      deleteFile:         (index)           => this.projectData._ref.child('scripts').child(index).remove(),
      editFile:           (index, newName)  => this.projectData._ref.child('scripts').child(index).child('name').set(newName),
      ownProject:         (newOwner)        => this.projectData._ref.child('owner').set(newOwner)
    };

  }
}