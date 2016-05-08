
import { Component, Inject, provide, enableProdMode } from 'angular2/core';
import { TitleBarComponent } from './titlebar/titlebar.component';
import template from './app.html'

import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { ProjectListComponent } from './projectlist/projectlist.component';

import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import './app.less';

if(window.location.hostname !== 'localhost') enableProdMode();

@RouteConfig([
  { path: '/',             name: 'Home',      component: HomeComponent, useAsDefault: true },
  { path: '/create/...',   name: 'Create',    component: CreateComponent },
  { path: '/projects',     name: 'Projects',  component: ProjectListComponent }
])
@Component({
  selector: 'app',
  directives: [TitleBarComponent, ROUTER_DIRECTIVES],
  template
})
export class App {}