import { Component, OnInit } from '@angular/core';

import { directives, secondarys } from './help.json';
import { PLUGINS } from '../../decklang/decklangstate';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  public directives: string[] = [];
  public help = { directives, secondarys };

  constructor() { }

  ngOnInit() {
    this.directives = Object.keys(directives);
  }

  helpText(directive: string) {
    return PLUGINS[directive].help;
  }

  exampleText(directive: string) {
    return PLUGINS[directive].examples;
  }

  directiveText(directive: string) {
    return PLUGINS[directive].docs;
  }

}
