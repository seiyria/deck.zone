
import { Component } from '@angular/core';
import template from './create.html';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { CreateContainerComponent } from './container/createcontainer.component';
import { InvalidProjectComponent } from './invalid/invalid.component';
import { SettingsComponent } from './settings/settings.component';

@RouteConfig([
  { path:'/',                     name: 'Root',     component: CreateContainerComponent, useAsDefault: true },
  { path:'/:projectId',           name: 'Create',   component: CreateContainerComponent },
  { path:'/:projectId/404',       name: 'Invalid',  component: InvalidProjectComponent },
  { path:'/:projectId/settings',  name: 'Settings', component: SettingsComponent }
])
@Component({
  template,
  directives: [ROUTER_DIRECTIVES]
})
export class CreateComponent {
  constructor() {}
}