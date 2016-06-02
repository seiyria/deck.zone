
import _ from 'lodash';

import { PluginComponent } from '../_base/_component';
import { Directive } from '@angular/core';

@Directive({
  selector: '[game-page]',
  inputs: ['state', 'isProd']
})
export class PageComponent extends PluginComponent {
  style() {
    const args = this.state.options.page;
    const baseObject = _.cloneDeep(args);

    if(!this.isProd) {
      _(baseObject).keys().each(key => {
        baseObject[key] = 'initial';
      });
    }

    this.assignStyle(baseObject);
  }
}