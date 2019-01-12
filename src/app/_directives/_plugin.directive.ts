import { OnChanges, ElementRef, Renderer2 } from '@angular/core';

export class PluginDirective implements OnChanges {

  public renderer: Renderer2;
  public elementRef: ElementRef;

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
