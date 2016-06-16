
import { Component } from '@angular/core';
import template from './home.html';
import './home.less';
import { HomeBlocksService } from '../../services/homeblocks';
import { TitleChangerService } from '../../services/titlechanger';

@Component({
  providers: [HomeBlocksService],
  template
})
export class HomeComponent {
  static get parameters() {
    return [[HomeBlocksService], [TitleChangerService]];
  }
  constructor(homeblocks, titleChangerService) {
    titleChangerService.changeTitle(null);
    this.homeblocks = homeblocks.getData();
  }
}