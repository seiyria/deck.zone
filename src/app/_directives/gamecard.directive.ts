
import { includes, extend } from 'lodash';

import { Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[gameCardContainer]'
})
export class GameCardContainerDirective extends PluginDirective {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) { super(); }

  @Input()
  public baseStyle: any;

  @Input()
  public specificStyle: any;

  style() {
    const args = extend({}, this.baseStyle, this.specificStyle);
    this.assignStyle(args);

  }
}
