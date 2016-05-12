
import { Title } from '@angular/platform-browser';

const BASE_TITLE = 'deck.zone';

// TODO use this - components should all inject title by default
// TODO the title bar of the page should read deck.zone - currentprojectname
// todo subtitle should be an event emitter

export class TitleChangerService {
  static get parameters() {
    return [[Title]];
  }

  constructor(title) {
    this._title = title;
  }

  changeTitle(newTitle) {
    this.currentSubTitle = newTitle;

    if(!newTitle) return this._title.setTitle(BASE_TITLE);
    this._title.setTitle(`${BASE_TITLE} - ${newTitle}`);
  }

  get subtitle() {
    return this.currentSubTitle;
  }
}