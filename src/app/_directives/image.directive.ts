import { Directive, Input } from '@angular/core';
import { PluginDirective } from './_plugin.directive';

@Directive({
  selector: '[resultImage]'
})
export class ImageDirective extends PluginDirective {

  @Input()
  public args: any;

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
