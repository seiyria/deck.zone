
import { Component } from 'angular2/core';
import template from './create.html';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { CreateContainerComponent } from './container/createcontainer.component';
import { InvalidProjectComponent } from './invalid/invalid.component';

@RouteConfig([
  { path:'/',                 name: 'Root',    component: CreateContainerComponent, useAsDefault: true },
  { path:'/:projectId',       name: 'Create',  component: CreateContainerComponent },
  { path:'/:projectId/404',   name: 'Invalid', component: InvalidProjectComponent }
])
@Component({
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class CreateComponent {
  constructor() {}
}