import { Renderer2 } from "@angular/core";

export interface Toc {
  toHtml(renderer: Renderer2): HTMLElement;
  add(item: Toc): void;
  getParent(): Toc;
  getDepth(): string;
  getLastChild(): Toc;
  isRootNode(): boolean;
}

export const errorRootCallsGetParent = '[ngx-toc] This is root node but is called getParent().'

export class Ul implements Toc {
  
  private items: Toc[];
  private depth: string;
  private parent: Toc | null;
  
  constructor(depth: string, parent: Toc | null) {
    this.items = [];
    this.depth = depth;
    this.parent = parent;
  }

  toHtml(renderer: Renderer2): HTMLElement {
    let ul = renderer.createElement('ul');
    this.items.forEach(item => {
      ul.appendChild(item.toHtml(renderer));
    })
    return ul; 
  }
  
  add(item: Toc): void {
    this.items.push(item);
  }
  
  getDepth(): string {
    return this.depth;
  }
  
  getParent(): Toc {
    if (!this.parent) {
      throw new Error(errorRootCallsGetParent);
    }
    return this.parent;
  }

  getLastChild(): Toc {
    return this.items[this.items.length - 1];
  }

  isRootNode(): boolean {
    return (this.parent === null);
  }
  
}

export const errorNotSupportedOperation = '[ngx-toc] Not supported operation.'

export class Li implements Toc {
  
  private items: Toc[] = [];

  toHtml(renderer: Renderer2): HTMLElement {
    let li = renderer.createElement('li');
    this.items.forEach(item => {
      li.appendChild(item.toHtml(renderer));
    })
    return li;
  }
  
  add(item: Toc): void { 
    this.items.push(item);
   }
   
  getParent(): Ul { throw new Error(errorNotSupportedOperation); }
  getDepth(): string { throw new Error(errorNotSupportedOperation); }
  getLastChild(): Toc { throw new Error(errorNotSupportedOperation); }
  isRootNode(): boolean { throw new Error(errorNotSupportedOperation); }
}

export class A implements Toc {

  private path: string;
  private fragment: string;
  private text: string;
  
  constructor(path: string, fragment: string, text: string) {
    this.path = path;
    this.fragment = fragment;
    this.text = text;
  }

  toHtml(renderer: Renderer2): HTMLElement {
    let a = renderer.createElement('a');
    a.href = `${this.path}#${this.fragment}`;
    a.innerHTML = this.text;
    return a;
  }

  add(item: Toc): void { throw new Error(errorNotSupportedOperation); }
  getParent(): Ul { throw new Error(errorNotSupportedOperation); }
  getDepth(): string { throw new Error(errorNotSupportedOperation); }
  getLastChild(): Toc { throw new Error(errorNotSupportedOperation); }
  isRootNode(): boolean { throw new Error(errorNotSupportedOperation); }
}