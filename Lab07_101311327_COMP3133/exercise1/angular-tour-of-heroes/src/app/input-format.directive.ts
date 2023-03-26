import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[customInputFormat]',
})
export class InputFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('blur')
  onBlur() {
    const value = this.el.nativeElement.value.toUpperCase();
    this.el.nativeElement.value = value;
  }
}
