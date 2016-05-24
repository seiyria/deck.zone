
import { Component, EventEmitter } from '@angular/core';
import template from './createcontainer.html';
import { RouteParams, Router } from '@angular/router-deprecated';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CreatorComponent } from './creator/creator.component';
import { ClaimerComponent } from './claimer/claimer.component';
import { ResultsComponent } from './results/results.component';

import { StorageService } from 'ng2-storage';
import { Auth } from '../../../services/auth';
import { CurrentProjectService } from '../../../services/currentproject';
import { TitleChangerService } from '../../../services/titlechanger';

@Component({
  providers: [CurrentProjectService, StorageService],
  directives: [SidebarComponent, ToolbarComponent, CreatorComponent, ClaimerComponent, ResultsComponent],
  template
})
export class CreateContainerComponent {
  static get parameters() {
    return [[RouteParams], [Router], [CurrentProjectService], [TitleChangerService], [StorageService], [Auth]];
  }

  constructor(routeParams, router, currentProjectService, titleChangerService, storage, auth) {
    this.projectId = routeParams.params.projectId;
    this.storage = storage.local;
    this.authData = auth.authData;

    if(!this.projectId) {
      return router.navigate(['/Home']);
    }

    this.projectData = currentProjectService.getContent(this.projectId);
    this.projectData._ref.on('value', snap => {
      const value = snap.val();

      this.projectData.ownsProject = auth.owns(value);
      const isPrivate = value.visibility === 'Private';

      if(!value || (!this.projectData.ownsProject && isPrivate)) {
        router.navigate(['../Invalid', { projectId: this.projectId }]);
        return;
      }

      titleChangerService.changeTitle(value.name);
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