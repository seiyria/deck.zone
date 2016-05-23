
import { Component } from '@angular/core';
import template from './claimer.html';
import { ProjectComponent } from '../project.component';
import { AlertComponent } from 'ng2-bootstrap/components/alert';
import { CurrentProjectService } from '../../../../services/currentproject';

@Component({
  selector: 'claimer',
  directives: [AlertComponent],
  providers: [CurrentProjectService],
  inputs: ['project', 'api'],
  template
})
export class ClaimerComponent extends ProjectComponent {

  static get parameters() {
    return [[CurrentProjectService]];
  }

  constructor(currentProjectService) {
    super();
    this.currentProjectService = currentProjectService;
  }

  claim() {
    this.api.ownProject(this.currentProjectService.auth.authData.uid);
  }

}