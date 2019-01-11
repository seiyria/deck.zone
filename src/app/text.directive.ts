
import * as _ from 'lodash';
import { ElementRef, Directive, Renderer2, Input, OnChanges } from '@angular/core';

@Directive({
})
export class PluginDirective implements OnChanges {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  setStyle() { this.style(); }

  style() { }

  assignStyle(baseObject = {}) {
    _(baseObject).keys().each(key => {
      this.renderer.setStyle(this.elementRef.nativeElement, key, baseObject[key]);
    });
  }

  ngOnChanges() {
    this.setStyle();
  }

}

@Directive({
  selector: '[resultText]'
})
export class TextDirective extends PluginDirective {

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
  selector: '[resultTextContainer]'
})
export class TextContainerDirective extends PluginDirective {

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
