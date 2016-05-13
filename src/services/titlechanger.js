
import { EventEmitter } from '@angular/core';
import { Title } from '@angular/platform-browser';

const BASE_TITLE = 'deck.zone';

export class TitleChangerService {
  static get parameters() {
    return [[Title]];
  }

  constructor(title) {
    this._title = title;
    this.currentSubTitle = new EventEmitter();
  }

  changeTitle(newTitle) {
    this.currentSubTitle.next(newTitle);

    if(!newTitle) return this._title.setTitle(BASE_TITLE);
    this._title.setTitle(`${BASE_TITLE} - ${newTitle}`);
  }
}