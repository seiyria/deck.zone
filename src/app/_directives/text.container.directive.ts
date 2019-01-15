
import { includes } from 'lodash';

import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[resultTextContainer]'
})
export class TextContainerDirective extends PluginDirective {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) { super(); }

  @Input()
  public args: any;

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
      'z-index':        args['z-index']
    };

    if(includes(font.decoration, 'I'))      baseObject['font-style'] = 'italic';
    else                                    baseObject['font-style'] = 'none';

    if(includes(font.decoration, 'B'))      baseObject['font-weight'] = 'bold';
    else                                    baseObject['font-weight'] = 'none';

    if(includes(font.decoration, 'U'))      baseObject['text-decoration'] = 'underline';
    else if(includes(font.decoration, 'S')) baseObject['text-decoration'] = 'line-through';
    else                                    baseObject['text-decoration'] = 'none';

    this.assignStyle(baseObject);

  }
}
