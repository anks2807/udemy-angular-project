import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownItem]'
})
export class DropdownItemDirective {

  // @HostBinding('class.open') isOpen = false;
  isOpen: boolean = false;
  @HostListener('click')
  toggleOpen() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.renderer.addClass(this.elementRef.nativeElement, 'open');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'open');
    }
  }
  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

}
