import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from 'ngx-toc';

@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component {

  @ViewChild('toc') 
  toc!: ElementRef;

  constructor(private tocService: TocService, private renderer: Renderer2, private router: Router) {
  }

  onReady() {
    this.renderer.appendChild(this.toc.nativeElement, this.tocService.createToc('toc-target', ['h1', 'h2', 'h3'], this.router.url, this.renderer));
  }

}
