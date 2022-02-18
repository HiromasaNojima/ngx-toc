import { AfterViewInit, Component, ElementRef, Input, Optional, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from './toc.service';

const defaultTarget: string = 'toc-target';
const defaultTargetHeadings: string[] = ['h1', 'h2', 'h3'];
@Component({
  selector: 'ngx-toc',
  template: ''
})
export class TocComponent implements AfterViewInit {

  @Input() target: string | undefined;
  @Input() targetHeadings: string[] | undefined;
  @Input() path: string | undefined;

  constructor(private element: ElementRef<HTMLElement>, private tocService: TocService, private renderer: Renderer2, @Optional() private router: Router) { }
  ngAfterViewInit(): void {
    let target = this.target ? this.target : defaultTarget;
    let targetHeadings = this.targetHeadings ? this.targetHeadings : defaultTargetHeadings;
    let path = this.path ? this.path : this.router.url;
    this.element.nativeElement.appendChild(this.tocService.createToc(target, targetHeadings, path, this.renderer));
  }

}
