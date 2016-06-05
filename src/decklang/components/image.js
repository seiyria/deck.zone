
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
      left:             `${args.x.val}${args.x.unit}`,
      top:              `${args.y.val}${args.y.unit}`,
      width:            `${args.w.val}${args.w.unit}`,
      height:           `${args.h.val}${args.h.unit}`
    };

    this.assignStyle(baseObject);

  }
}