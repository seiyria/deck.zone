
import _ from 'lodash';

import { PluginComponent } from '../_base/_component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-text]',
  inputs: ['args']
})
export class TextComponent extends PluginComponent {
  style() {
    const args = this.args;
    const font = args.font;

    /* const transforms = {
      left: 'flex-start',
      right: 'flex-end',
      center: 'center',

      top: 'flex-start',
      bottom: 'flex-end',
      middle: 'center'
    }; */

    const baseObject = {
      position:         'absolute',
      overflow:         'hidden',
      /* 'flex-direction': 'column',
      display: 'flex',
      'align-items': transforms[args.vertAlign],
      'justify-content': transforms[args.horizAlign], */
      'word-wrap':      'break-word',
      left:             `${args.left}`,
      top:              `${args.top}`,
      width:            `${args.width}`,
      height:           `${args.height}`,
      'font-family':    font.family,
      'font-size':      `${font.size}${font.unit}`,
      color:            font.color,
      display: 'table-cell',
      'vertical-align': args.vertAlign,
      'text-align':     args.horizAlign
    };

    if(_.includes(font.decoration, 'I')) baseObject['font-style'] = 'italic';
    else                                 baseObject['font-style'] = 'none';

    if(_.includes(font.decoration, 'B')) baseObject['font-weight'] = 'bold';
    else                                 baseObject['font-weight'] = 'none';

    if(_.includes(font.decoration, 'U')) baseObject['text-decoration'] = 'underline';
    else                                 baseObject['text-decoration'] = 'none';

    this.assignStyle(baseObject);

  }
}