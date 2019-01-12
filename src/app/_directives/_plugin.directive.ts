import { OnChanges, ElementRef, Renderer2 } from '@angular/core';

export class PluginDirective implements OnChanges {

  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}

  setStyle() { this.style(); }

  style() { }

  assignStyle(baseObject = {}) {
    Object.keys(baseObject).forEach(key => {
      this.renderer.setStyle(this.elementRef.nativeElement, key, baseObject[key]);
    });
  }

  ngOnChanges() {
    this.setStyle();
  }

}