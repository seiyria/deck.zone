
import { Component } from '@angular/core';
import template from './toolbar.html';
import { ProjectComponent } from '../project.component';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { StorageService } from 'ng2-storage';

import { CurrentProjectService } from '../../../../services/currentproject';
import { Auth } from '../../../../services/auth';

import _ from 'lodash';
import JSZip from 'jszip';
import { saveAs } from 'filesaverjs';

@Component({
  selector: 'toolbar',
  directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [StorageService, CurrentProjectService],
  inputs: ['project', 'projectId', 'api'],
  template
})
export class ToolbarComponent extends ProjectComponent {

  static get parameters() {
    return [[StorageService], [Auth], [CurrentProjectService], [Router]];
  }

  constructor(storage, auth, currentProjectService, router) {
    super();
    this.auth = auth;
    this.router = router;
    this.currentProjectService = currentProjectService;
    this.storage = storage.local;
  }

  _replaceName(filename) { return filename.split('.deck').join('.txt'); }

  fork() {
    this.internalProject.projectId = this.projectId;
    const id = this.currentProjectService.createNewProject(this.internalProject);
    this.router.navigate(['/Create', 'Create', { projectId: id }]);
  }

  download() {
    const zip = new JSZip();

    _.each(_.values(this.internalProject.scripts), script => {
      zip.file(this._replaceName(script.name), script.contents);
    });

    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, `${this.internalProject.name}-${Date.now()}.zip`);
      });
  }

}