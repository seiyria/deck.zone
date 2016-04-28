
import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import template from './titlebar.html';

@Component({
  selector: 'titlebar',
  directives: [ROUTER_DIRECTIVES],
  template
})
export class TitleBar {
  static get parameters() {
    return [[Router]];
  }
  constructor(router) {
    this.router = router;
  }
}