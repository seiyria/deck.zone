
import _ from 'lodash';

import { PluginComponent } from '../_base/_plugin';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-text]',
  inputs: ['args']
})
export class TextComponent extends PluginComponent {
  style() {
    const args = this.args;
    const font = args.state.options.font;

    const baseObject = {
      position:         'absolute',
      overflow:         'hidden',
      'word-wrap':      'break-word',
      left:             `${args.x.val}${args.x.unit}`,
      top:              `${args.y.val}${args.y.unit}`,
      width:            `${args.w.val}${args.w.unit}`,
      height:           `${args.h.val}${args.h.unit}`,
      'font-family':    font.family,
      'font-size':      `${font.size}${font.unit}`,
      color:            font.color,
      'vertical-align': args.vertAlign,
      'text-align':     args.horizAlign
    };

    if(_.includes(font.decoration, 'I')) baseObject['font-style'] = 'italic';
    if(_.includes(font.decoration, 'B')) baseObject['font-weight'] = 'bold';
    if(_.includes(font.decoration, 'U')) baseObject['text-decoration'] = 'underline';

    setTimeout(() => args.styleObject = baseObject);
  }
}