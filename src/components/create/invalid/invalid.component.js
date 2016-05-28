
import { TitleChangerService } from '../../../services/titlechanger';
import { Component } from '@angular/core';
import template from './invalid.html';

@Component({
  template
})
export class InvalidProjectComponent {
  static get parameters() {
    return [[TitleChangerService]];
  }
  constructor(titleChangerService) {
    titleChangerService.changeTitle(null);
  }
}