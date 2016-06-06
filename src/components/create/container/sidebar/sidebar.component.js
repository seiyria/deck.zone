
import _ from 'lodash';
import { SweetAlertService } from 'ng2-sweetalert2';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import template from './sidebar.html';
import './sidebar.less';

import { STRING_SIZES } from '../../../../constants/defaultproject';
import { Auth } from '../../../../services/auth';
import { CurrentProjectService } from '../../../../services/currentproject';
import { ProjectComponent } from '../project.component';

const FILE_EXTENSION = '.deck';

@Component({
  selector: 'sidebar',
  providers: [SweetAlertService, CurrentProjectService],
  inputs: ['projectId', 'project', 'api'],
  directives: [NgClass],
  template
})
export class SidebarComponent extends ProjectComponent {

  static get parameters() {
    return [[SweetAlertService], [CurrentProjectService], [Auth]];
  }

  constructor(swal, currentProjectService, auth) {
    super();
    this.isVisible = {};
    this.auth = auth;
    this.swalService = swal;
    this.currentProjectService = currentProjectService;
  }

  ngOnChanges(data) {
    super.ngOnChanges(data);
    this.scriptList = this.currentProjectService.getScriptList(this.projectId);
    this.scriptList._ref.once('value', snap => this.allScripts = this.sortedScripts(snap.val()));

    this.resourceList = this.currentProjectService.getResourceList(this.projectId);
    this.resourceList._ref.once('value', snap => this.allResources = this.sortedResources(snap.val()));
  }

  sortedScripts(scriptList) {
    return _(scriptList).keys().map(key => ({ key: key, script: scriptList[key] })).sortBy(obj => obj.script.name).value();
  }

  sortedResources(resourceList) {
    return _(resourceList).keys().map(key => ({ key: key, resource: resourceList[key] })).sortBy(obj => obj.resource.name).value();
  }

  setActiveScript(index) {
    this.api.changeActiveScript(index);
  }

  validateFilename(scriptList, value) {
    const duplicateName = () => _.some(scriptList, scriptObj => _.includes([value, `${value}${FILE_EXTENSION}`], scriptObj.script.name));
    return new Promise((resolve, reject) => {
      if(!value)                                 return reject('You need to give the file a name.');
      if(value.length > STRING_SIZES.scriptName) return reject('File name limited to 20 characters.');
      if(duplicateName())                        return reject('You already have a file named that!');

      resolve();
    });
  }

  cleanFilename(val) {
    if(!val.endsWith(FILE_EXTENSION)) val = `${val}${FILE_EXTENSION}`;
    return val;
  }

  newResource() {
    this.swalService.swal({
      title: 'New Resource',
      html:
      `
        <div class="swal2-content" style="display: block;">Enter the URL for your resource:</div>
        <input id="swal-input1" type="url" pattern="https?://.+" class="swal2-input" placeholder="http://..." autofocus>
        <div class="swal2-content" style="display: block;">Enter a name for your resource:</div>
        <input id="swal-input2" class="swal2-input" placeholder="Name...">
      `,
      preConfirm: (result) => {
        return new Promise((resolve) => {
          if(!result) return;
          resolve([
            document.getElementById('swal-input1').value,
            document.getElementById('swal-input2').value
          ]);
        });
      }
    }).then(val => {
      if(!val) return;
      val[1] = val[1].replace(/[^\w:]/gm, '');
      this.api.newResource({ url: val[0], name: val[1] });
    });
  }

  newFile() {
    this.swalService.prompt({
      title:'New File',
      text: 'Enter a new file name:',
      inputPlaceholder: 'filename.deck',
      inputValidator: this.validateFilename.bind(this, this.allScripts)
    }).then(val => {
      if(!val) return;
      val = this.cleanFilename(val);
      this.api.newFile(val);
    });
  }

  editFile(scriptObj) {
    const index = scriptObj.key;
    this.swalService.prompt({
      title:'Edit File Name',
      text: 'Enter a new file name:',
      inputPlaceholder: 'filename.deck',
      inputValue: scriptObj.script.name,
      inputValidator: this.validateFilename.bind(this, this.allScripts)
    }).then(val => {
      if(!val) return;
      val = this.cleanFilename(val);
      this.api.editFile(index, val);
    });
  }

  deleteFile(scriptObj) {
    const index = scriptObj.key;
    this.swalService.confirm({ title: 'Delete File', text: `Are you sure you want to delete ${scriptObj.script.name}?` }).then(val => {
      if(!val) return;

      this.api.deleteFile(index);
      if(index === this.internalProject.activeScript) {
        this.setActiveScript(this.allScripts[0].key);
      }
    });
  }

  deleteResource(resourceObj) {
    const index = resourceObj.key;
    this.swalService.confirm({ title: 'Delete Resource', text: `Are you sure you want to delete ${resourceObj.resource.name}?` }).then(val => {
      if(!val) return;

      this.api.deleteResource(index);
    });
  }

}