
import { includes } from 'lodash';
import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[resultText]'
})
export class TextDirective extends PluginDirective {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) { super(); }

  @Input()
  public args: any;

  style() {
    const args = this.args;
    const font = args.font;

    const baseObject = {
      width:            '100%',
      height:           '100%',
      display:          'table-cell',
      'vertical-align': args.vertAlign
    };

    if(includes(font.decoration, 'I')) baseObject['font-style'] = 'italic';
    else                               baseObject['font-style'] = 'none';

    if(includes(font.decoration, 'B')) baseObject['font-weight'] = 'bold';
    else                               baseObject['font-weight'] = 'none';

    if(includes(font.decoration, 'U')) baseObject['text-decoration'] = 'underline';
    else                               baseObject['text-decoration'] = 'none';

    this.assignStyle(baseObject);

  }
}
