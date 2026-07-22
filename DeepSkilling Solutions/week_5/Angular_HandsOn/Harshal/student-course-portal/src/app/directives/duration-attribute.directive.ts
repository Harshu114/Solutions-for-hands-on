import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDuration]'
})
export class DurationAttributeDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'font-style', 'italic');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#7f8c8d');
  }
}