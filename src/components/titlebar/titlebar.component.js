
import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import template from './titlebar.html';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { CurrentProjectService } from '../../services/currentproject';

@Component({
  selector: 'titlebar',
  providers: [CurrentProjectService, AngularFire],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  template
})
export class TitleBar {
  static get parameters() {
    return [[Router], [AngularFire], [CurrentProjectService]];
  }

  constructor(router, angularFire, currentProjectService) {
    this.router = router;
    this.angularFire = angularFire;
    this.currentProjectService = currentProjectService;
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