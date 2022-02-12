import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-toc',
  template: `
    <p>
      ngx-toc works!
    </p>
  `,
  styles: [
  ]
})
export class TocComponent implements OnInit, AfterViewInit {

  constructor(private element: ElementRef<HTMLElement>) { }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }



}
