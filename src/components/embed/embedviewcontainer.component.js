
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, RouteParams } from '@angular/router-deprecated';

import { EmbedViewComponent } from './embedview/embedview.component';

import template from './embedviewcontainer.html';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template
})
@RouteConfig([
  { path:'/',                     name: 'Root',     component: EmbedViewComponent, useAsDefault: true },
  { path:'/:projectId',           name: 'Embed',    component: EmbedViewComponent }
])
export class EmbedViewContainerComponent {

  constructor() {}

}