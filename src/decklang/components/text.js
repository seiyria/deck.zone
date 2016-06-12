
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

    const baseObject = {
      width:            '100%',
      height:           '100%',
      display:          'table-cell',
      'vertical-align': args.vertAlign
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

@Directive({
  selector: '[game-text-container]',
  inputs: ['args']
})
export class TextContainerComponent extends PluginComponent {
  style() {
    const args = this.args;
    const font = args.font;

    const baseObject = {
      position:         'absolute',
      overflow:         'hidden',
      display:          'table',
      'word-wrap':      'break-word',
      left:             `${args.left}`,
      top:              `${args.top}`,
      width:            `${args.width}`,
      height:           `${args.height}`,
      'font-family':    font.family,
      'font-size':      `${font.size}${font.unit}`,
      color:            font.color,
      'text-align':     args.horizAlign,
      'z-index':        20
    };

    if(_.includes(font.decoration, 'I'))      baseObject['font-style'] = 'italic';
    else                                      baseObject['font-style'] = 'none';

    if(_.includes(font.decoration, 'B'))      baseObject['font-weight'] = 'bold';
    else                                      baseObject['font-weight'] = 'none';

    if(_.includes(font.decoration, 'U'))      baseObject['text-decoration'] = 'underline';
    else if(_.includes(font.decoration, 'S')) baseObject['text-decoration'] = 'line-through';
    else                                      baseObject['text-decoration'] = 'none';

    this.assignStyle(baseObject);

  }
}