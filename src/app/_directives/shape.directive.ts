import { Directive, Input } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[resultShape]'
})
export class ShapeDirective extends PluginDirective {

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

    this.assignStyle({});

  }
}