import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighligth]'
})
export class HighligthDirective {

  @Input() appHighligth = '#faf5b2';

  constructor(private el: ElementRef) {
    
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighligth);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight('');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
