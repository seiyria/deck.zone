
// import _ from 'lodash';

import { PluginComponent } from '../_base/_component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-image]',
  inputs: ['args']
})
export class ImageComponent extends PluginComponent {
  style() {
    const args = this.args;

    const baseObject = {
      position:         'absolute',
      top:              `${args.top}`,
      left:             `${args.left}`,
      width:            `${args.width}`,
      height:           `${args.height}`
    };

    this.assignStyle(baseObject);

  }
}