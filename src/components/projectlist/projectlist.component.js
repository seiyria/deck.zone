
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import template from './projectlist.html';
import './projectlist.less';

import _ from 'lodash';

import { CurrentProjectService } from '../../services/currentproject';
import { TitleChangerService } from '../../services/titlechanger';

@Component({
  providers: [CurrentProjectService],
  directives: [ROUTER_DIRECTIVES],
  template
})
export class ProjectListComponent {
  static get parameters() {
    return [[Router], [CurrentProjectService], [TitleChangerService]];
  }

  size(ref) {
    return _.size(ref);
  }

  constructor(router, currentProjectService, titleChangerService) {
    titleChangerService.changeTitle('Project List');

    this.router = router;
    this.currentProjectService = currentProjectService;
  }

  ngOnInit() {
    this.loadedProjects = false;

    this.currentProjectService.auth.subscribe(authData => {

      // route home if not logged in
      if (!authData) {
        return this.router.navigate(['../Home']);
      }

      this.projects = this.currentProjectService.getAllProjects(authData.auth.uid);
      this.loadedProjects = true;
    });
  }

  createProject(name) {
    const id = this.currentProjectService.createNewProject({ name });
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
}