
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router-deprecated';
import { AngularFire } from 'angularfire2';
import template from './examples.html';
import './examples.less';

import { TitleChangerService } from '../../services/titlechanger';

@Component({
  directives: [ROUTER_DIRECTIVES],
  template
})
export class ExamplesComponent {
  static get parameters() {
    return [[Router], [TitleChangerService], [AngularFire]];
  }

  constructor(router, titleChangerService, angularFire) {
    titleChangerService.changeTitle('');

    this.router = router;

    this.examples = angularFire.list('/examples', {
      query: {
        orderByChild: 'name'
      }
    });
  }
}