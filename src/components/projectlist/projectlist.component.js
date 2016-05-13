
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs';
import template from './projectlist.html';
import './projectlist.less';

import { CurrentProjectService } from '../../services/currentproject';
import { TitleChangerService } from '../../services/titlechanger';

@Component({
  providers: [AngularFire, CurrentProjectService],
  directives: [ROUTER_DIRECTIVES],
  template
})
export class ProjectListComponent {
  static get parameters() {
    return [[Router], [AngularFire], [CurrentProjectService], [TitleChangerService]];
  }

  constructor(router, angularFire, currentProjectService, titleChangerService) {
    titleChangerService.changeTitle('Project List');
    this.router = router;
    this.angularFire = angularFire;
    this.currentProjectService = currentProjectService;

    this.angularFire.auth.subscribe(authData => {

      // route home if not logged in
      if(!authData) {
        return router.navigate(['../Home']);
      }

      this.projects = this.angularFire.list('/projects', {
        query: {
          orderByChild: 'owner',
          equalTo: authData.auth.uid
        }
      });
    });
  }

  createProject(name) {
    const id = this.currentProjectService.createNewProject({ name });
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
}