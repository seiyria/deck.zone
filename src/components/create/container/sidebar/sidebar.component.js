
import _ from 'lodash';
import { SweetAlertService } from 'ng2-sweetalert2';
import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import template from './sidebar.html';
import './sidebar.less';

import { STRING_SIZES } from '../../../../constants/defaultproject';
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
    return [[SweetAlertService], [CurrentProjectService]];
  }

  constructor(swal, currentProjectService, storage) {
    super();
    this.isVisible = {};
    this.swalService = swal;
    this.currentProjectService = currentProjectService;
  }

  ngOnChanges(data) {
    super.ngOnChanges(data);
    this.scriptList = this.currentProjectService.getScriptList(this.projectId);
    this.scriptList._ref.once('value', snap => this.allScripts = this.sortedScripts(snap.val()));
  }

  sortedScripts(scriptList) {
    return _(scriptList).keys().map(key => ({ key: key, script: scriptList[key]})).sortBy(obj => obj.script.name).value();
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

}