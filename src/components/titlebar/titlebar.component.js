
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { AuthProviders, AuthMethods } from 'angularfire2';
import template from './titlebar.html';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { Auth } from '../../services/auth';
import { CurrentProjectService } from '../../services/currentproject';
import { TitleChangerService } from '../../services/titlechanger';

import _ from 'lodash';

@Component({
  selector: 'titlebar',
  providers: [CurrentProjectService, Auth],
  directives: [ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  template
})
export class TitleBarComponent {
  static get parameters() {
    return [[Router], [Auth], [CurrentProjectService], [TitleChangerService]];
  }

  constructor(router, auth, currentProjectService, titleChangerService) {
    this.router = router;
    this.auth = auth;
    this.currentProjectService = currentProjectService;
    titleChangerService.currentSubTitle.subscribe(val => this.currentSubTitle = val);
    this.showSelf = false;

    this.router.subscribe(
      currentUrl => this.showSelf = !_.includes(currentUrl, 'embed'),
      error => console.log(error)
    );
  }

  logout() {
    this.auth.angularFire.auth.logout();
  }

  login(method) {
    this.auth.angularFire.auth.login({
      provider: AuthProviders[method],
      method: AuthMethods.Popup
    });
  }

  createProject() {
    const id = this.currentProjectService.createNewProject();
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }
}