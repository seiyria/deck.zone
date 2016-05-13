
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import template from './titlebar.html';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { CurrentProjectService } from '../../services/currentproject';
import { TitleChangerService } from '../../services/titlechanger';

import _ from 'lodash';

@Component({
  selector: 'titlebar',
  providers: [CurrentProjectService, AngularFire],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  template
})
export class TitleBarComponent {
  static get parameters() {
    return [[Router], [AngularFire], [CurrentProjectService], [TitleChangerService]];
  }

  constructor(router, angularFire, currentProjectService, titleChangerService) {
    this.router = router;
    this.angularFire = angularFire;
    this.currentProjectService = currentProjectService;
    titleChangerService.currentSubTitle.subscribe(val => this.currentSubTitle = val);
  }

  logout() {
    this.angularFire.auth.logout();
  }

  login(method) {
    this.angularFire.auth.login({
      provider: AuthProviders[method],
      method: AuthMethods.Popup
    });
  }

  createProject() {
    const id = this.currentProjectService.createNewProject();
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
}