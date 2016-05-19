
import { Plugin, PluginComponent } from './_plugin';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-text]',
  inputs: ['args']
})
export class TextComponent extends PluginComponent {
  style() {
    const args = this.args;
    const unit = args.state.options.unit;
    const font = args.state.options.font;

    const baseObject = {
      position:         'absolute',
      left:             `${args.x}${unit}`,
      top:              `${args.y}${unit}`,
      width:            `${args.w}${unit}`,
      height:           `${args.h}${unit}`,
      'font-family':    font.family,
      'font-size':      `${font.size}${font.unit}`,
      color:            font.color,
      'vertical-align': font.vertAlign,
      'text-align':     font.horizAlign
    };

    if(_.includes(font.decoration, 'I')) baseObject['font-style'] = 'italic';
    if(_.includes(font.decoration, 'B')) baseObject['font-weight'] = 'bold';
    if(_.includes(font.decoration, 'U')) baseObject['text-decoration'] = 'underline';

    setTimeout(() => args.styleObject = baseObject);
  }
}

export class Text extends Plugin {

  static operate(args, state) {
    super.operate(args, state);

    if(!state.cards[args.index-1]) state.cards[args.index-1] = state.newCard();
    state.cards[args.index-1].texts.push(args);
  }

}