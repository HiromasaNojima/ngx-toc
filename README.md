# ngx-toc

ngx-toc is an Angular library that makes table-of-contents from heading elements.

# Installation

To add ngx-toc library to your `package.json` use the following command.

```
npm install ngx-toc --save
```

Then add imports to NgModule.

```javascript
import { NgxTocModule } from 'ngx-toc';

@NgModule({
  ...
  imports: [
    NgxTocModule,
  ...
})
```

# Usage

This library provides service to create toc.

## Use with static html

```javascript
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

You can find example at [Github](https://github.com/HiromasaNojima/ngx-toc/tree/main/src/app/demo1) and [Demo](https://sleepy-knuth-cedceb.netlify.app/demo1).

## Use with ngx-markdown

[ngx-markdown](https://github.com/jfcere/ngx-markdown) is the library to use markdown in Angular.<br>
`ngx-toc` can collaborate with this.

- html

```html
<div #toc id="toc"></div>
<markdown id="toc-target" [src]="path/to/file.md" (ready)="onReady()"></markdown>
<!-- <markdown></markdown> is ngx-markdown component. -->
```

- component

```javascript
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

You can find example at [Github](https://github.com/HiromasaNojima/ngx-toc/tree/main/src/app/demo2) and [Demo](https://sleepy-knuth-cedceb.netlify.app/demo2).

## Parameters

```javascript
TocService.createToc(targetId: string, targetHeadings: string[], path: string, renderer: Renderer2): HTMLElement
```

| parameter | type | description | example |
| :- | :- | :- | :- |
| targetId | string | id of target element to create toc | `'toc-target'`<br>if you'd like to create toc of following element.<br>`<div id="toc-target"><h1 id="bar">bar</h1></div>` |
| targetHeadings | string[] | heading tags to crate toc from | `['h1', 'h2', 'h3']`<br>then create toc from h1, h2, h3 tags. |
| path | string | path of href value | `'/foo'`<br>then href of toc is `href="/foo#id"`. |
| renderer | Renderer2 | renderer to render toc | - |

# License

Licensed under [MIT](https://opensource.org/licenses/MIT).  