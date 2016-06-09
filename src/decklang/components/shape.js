
// import _ from 'lodash';

import { PluginComponent } from '../_base/_component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-shape]',
  inputs: ['args']
})
export class ShapeComponent extends PluginComponent {
  style() {
    const args = this.args;

    if(args.shape === 'ellipse') {
      args.position = 'absolute';
      args['border-style'] = 'solid';
      args['border-radius'] = '50%';
      this.assignStyle(args);
      return;
    }

    this.assignStyle({});

  }
}