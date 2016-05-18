
import { Component, EventEmitter } from '@angular/core';
import { FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/common';
import template from './settings.html';
import './settings.less';
import { RouteParams, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { SweetAlertService } from 'ng2-sweetalert2';
import { CurrentProjectService } from '../../../services/currentproject';
import { TitleChangerService } from '../../../services/titlechanger';
import { STRING_SIZES } from '../../../constants/defaultproject';

import _ from 'lodash';

@Component({
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [CurrentProjectService, SweetAlertService],
  template
})
export class SettingsComponent {

  static get parameters() {
    return [[RouteParams], [Router], [FormBuilder], [TitleChangerService], [CurrentProjectService], [SweetAlertService]];
  }

  constructor(routeParams, router, formBuilder, titleChangerService, currentProjectService, swalService) {
    this.projectId = routeParams.params.projectId;
    this.router = router;
    this.currentProjectService = currentProjectService;
    this.swalService = swalService;

    this.projectRef = currentProjectService.getContent(this.projectId);
    this.projectRef.subscribe(val => {
      if(!val) {
        return this.router.navigate(['../../Home']);
      }

      titleChangerService.changeTitle(`${val.name} - Settings`);

      this.form = formBuilder.group({
        name: [val.name, Validators.required]
      });

      this.name = this.form.controls.name;
    });
  }

  saveProject(formValue) {
    this.projectRef._ref.child('name').set(_.truncate(formValue.name, { length: STRING_SIZES.projectName }));
    this.swalService.alert({ title: 'Saved!', text: 'Project successfully updated!' });
  }

  deleteProject() {
    this.swalService.confirm({ title: 'Delete Project', text: `Are you sure you want to delete ${this.name.value}?` }).then(val => {
      if(!val) return;

      this.projectRef._ref.remove();
      this.router.navigate(['../../Projects']);
    });
  }
}