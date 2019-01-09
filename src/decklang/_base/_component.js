
import _ from 'lodash';
import { ElementRef, Renderer } from '@angular/core';

export class PluginComponent {

  static get parameters() {
    return [[ElementRef], [Renderer]];
  }

  constructor(elementRef, renderer) {
    this.elementRef = elementRef;
    this.renderer = renderer;
  }

  setStyle() { this.style(); }

  style() {
    return {};
  }

  assignStyle(baseObject = {}) {
    _(baseObject).keys().each(key => {
      this.renderer.setElementStyle(this.elementRef.nativeElement, key, baseObject[key]);
    });
  }

  ngOnChanges() {
    this.setStyle();
  }

}