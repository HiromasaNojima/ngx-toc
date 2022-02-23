import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from 'ngx-toc';

@Component({
  template: `
  <div #toc id="toc"></div>
  <div id="toc-target">
    <h1 id="h1-1">h1-1</h1>
    <h1 id="h1-2">h1-2</h1>
    <h2 id="h2-1">h2-1</h2>
    <h2 id="h2-2">h2-2</h2>
    <h3 id="h3-1">h3-1</h3>
    <h2 id="h2-3">h2-3</h2>
    <h1 id="h1-3">h1-3</h1>
  </div>`,
  styleUrls: ['./demo1.component.css']
})
export class Demo1Component implements AfterViewInit {

  @ViewChild('toc') 
  element!: ElementRef;

  constructor(private tocService: TocService, private renderer: Renderer2, private router: Router) {
  }
  ngAfterViewInit(): void {
    this.renderer.appendChild(this.element.nativeElement, this.tocService.createToc('toc-target', ['h1', 'h2', 'h3'], this.router.url, this.renderer));
  }
}
