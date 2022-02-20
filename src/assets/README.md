# ngx-toc

ngx-toc is an Angular library that makes table-of-contents from heading elements.

# Installation

To add ngx-toc library to your `package.json` use the following command.

```
npm install ngx-toc --save
```

Then add imports to NgModule.

```
import { NgxTocModule } from 'ngx-toc';

@NgModule({
  ...
  imports: [
    NgxTocModule,
  ...
})
```

# Usage

This library provide service to create toc.

## Use with static html

```
import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TocService } from 'ngx-toc';

@Component({
  selector: 'app-demo2',
  template: `
  <div #toc id="toc"></div>
  <div id="toc-target">
    <h1 id="h1-1">h1-1</h1>
    <h1 id="h1-2">h1-2</h1>
    <h2 id="h2-1">h2-1</h2>
    <h2 id="h2-2">h2-2</h2>
    <h3 id="h3-1">h3-1</h3>
    <h1 id="h1-3">h1-3</h1>
  </div>`,
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements AfterViewInit {

  @ViewChild('toc') 
  element!: ElementRef;

  constructor(private tocService: TocService, private renderer: Renderer2, private router: Router) {
  }
  ngAfterViewInit(): void {
    this.renderer.appendChild(this.element.nativeElement, this.tocService.createToc('toc-target', ['h1', 'h2', 'h3'], this.router.url, this.renderer));
  }
}
```

You can find example at [Github]() and [Demo]().

## Use with ngx-markdown

[ngx-markdown](https://github.com/jfcere/ngx-markdown) is library to use markdown in Angular.<br>
`ngx-toc` can collaborate with this.

- html

```
<div #toc id="toc"></div>
<markdown id="toc-target" [src]="path/to/file.md" (ready)="onReady()"></markdown>
```

- component

```
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
```

You can find example at [Github]() and [Demo]().

## Parameters

```
tocServie.createToc(targetId: string, targetHeadings: string[], path: string, renderer: Renderer2)
```

| parameter | description | example |
| :- | :- | :- |
| targetId | id of target element to create toc | `toc-target`<br>if you'd like to create toc of following element.<br>`<div id="toc-target"><h1>bar</h1></div>` |
| targetHeadings | heading elements to crate toc from | `['h1', 'h2', 'h3']`<br>then create toc according to h1, h2, h3 tags. |
| path | path of href value | `/foo`<br>then href is `href="/foo#id"`. |
| renderer | renderer to render toc | - |

# License

Licensed under [MIT](https://opensource.org/licenses/MIT).