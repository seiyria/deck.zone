
import { Component, Inject, provide } from 'angular2/core';
import { TitleBar } from './titlebar/titlebar.component';
import template from './app.html'
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

@RouteConfig([
  { path:'/',       name: 'Home', component: HomeComponent, useAsDefault: true },
  { path:'/play',   name: 'Play', component: PlayComponent }
])
@Component({
  selector: 'app',
  directives: [TitleBar, ROUTER_DIRECTIVES],
  template
})
export class App {}