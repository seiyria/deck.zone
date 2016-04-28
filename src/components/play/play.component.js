
import { Component } from 'angular2/core';
import template from './play.html';
import { AlertComponent } from 'ng2-bootstrap/components/alert';

@Component({
  directives: [AlertComponent],
  template
})
export class PlayComponent {
  constructor() {}
}