
import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { AngularFire } from 'angularfire2';
import { Subject } from 'rxjs';
import template from './projectlist.html';

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
    this.projectSubject = new Subject();

    this.projects = this.angularFire.list('/projects', {
      query: {
        orderByChild: 'owner',
        equalTo: this.projectSubject
      }
    });

    this.angularFire.auth.subscribe(authData => {
      this.projectSubject.next(authData.auth.uid);
      console.log(authData.auth.uid);
    });
  }

  /*
  createProject() {
    const id = this.currentProjectService.createNewProject();
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
  */
}