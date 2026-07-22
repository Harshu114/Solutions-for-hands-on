import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlightPassed]'
})
export class HighlightPassedDirective implements OnInit {
  @Input() appHighlightPassed: string = '';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.appHighlightPassed === 'passed') {
      this.renderer.addClass(this.el.nativeElement, 'highlight-passed');
    }
  }
}