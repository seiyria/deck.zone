
import _ from 'lodash';

import { Component } from '@angular/core';
import template from './help.html';
import './help.less';
import { TitleChangerService } from '../../services/titlechanger';

import help from './help.json';

@Component({
  template
})
export class HelpComponent {

  static get parameters() {
    return [[TitleChangerService]];
  }

  ngOnInit() {
    this.help = help;
    this.directives = _.keys(help.directives);
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  constructor(titleChangerService) {
    titleChangerService.changeTitle('Documentation');
  }
}