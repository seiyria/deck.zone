
import { Component } from '@angular/core';
import template from './toolbar.html';
import { ProjectComponent } from '../project.component';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

@Component({
  selector: 'toolbar',
  directives: [DROPDOWN_DIRECTIVES, ROUTER_DIRECTIVES],
  inputs: ['project', 'projectId', 'api'],
  template
})
export class ToolbarComponent extends ProjectComponent {

  save() {
    console.log('save', this.internalProject);
  }

}