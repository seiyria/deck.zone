
import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs';
import template from './projectlist.html';

import _ from 'lodash'

@Component({
  providers: [AngularFire],
  template
})
export class ProjectListComponent {
  static get parameters() {
    return [[Router], [AngularFire]];
  }

  constructor(router, angularFire) {
    this.router = router;
    this.angularFire = angularFire;

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

  /*
  createProject() {
    const id = this.currentProjectService.createNewProject();
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
  */
}