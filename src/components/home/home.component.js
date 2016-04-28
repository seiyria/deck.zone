
import { Component } from 'angular2/core';
import template from './home.html';
import './home.less';
import { HomeBlocksService } from '../../services/homeblocks'

@Component({
  providers: [HomeBlocksService],
  template
})
export class HomeComponent {
  static get parameters() {
    return [[HomeBlocksService]];
  }
  constructor(homeblocks) {
    this.homeblocks = homeblocks.getData();
  }
}