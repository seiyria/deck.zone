
import { Component } from '@angular/core';
import template from './toolbar.html';
import { ProjectComponent } from '../project.component';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { StorageService } from 'ng2-storage';

import _ from 'lodash';
import JSZip from 'jszip';
import { saveAs } from 'filesaverjs';

@Component({
  selector: 'toolbar',
  directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [StorageService],
  inputs: ['project', 'projectId', 'api'],
  template
})
export class ToolbarComponent extends ProjectComponent {

  static get parameters() {
    return [[StorageService]];
  }

  constructor(storage) {
    super();
    this.storage = storage.local;
  }

  _replaceName(filename) { return filename.split('.deck').join('.txt'); }

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