import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[resultShape]'
})
export class ShapeDirective extends PluginDirective {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) { super(); }

  @Input()
  public args: any;

  style() {
    const args = this.args;

    if(args.shape === 'ellipse') {
      args.position = 'absolute';
      args['border-style'] = 'solid';
      args['border-radius'] = '50%';
      this.assignStyle(args);
      return;
    }

    if(args.shape === 'rect') {
      args.position = 'absolute';
      args['border-style'] = 'solid';
      this.assignStyle(args);
      return;
    }

    this.assignStyle({});

  }
}
