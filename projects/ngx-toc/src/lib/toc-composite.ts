import { Renderer2 } from "@angular/core";
import { Queue } from "./queue";

export interface Toc {
  toHtml(renderer: Renderer2): HTMLElement;
  add(item: Toc): void;
  getParent(): Toc;
  getDepth(): string;
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
  
}

export const errorNotSupportedOperation = '[ngx-toc] Not supported operation.'

export class Li implements Toc {
  
  private path: string;
  private fragment: string;
  private text: string;
  
  constructor(path: string, fragment: string, text: string) {
    this.path = path;
    this.fragment = fragment;
    this.text = text;
  }

  toHtml(renderer: Renderer2): HTMLElement {
    let li = renderer.createElement('li');
    let a = renderer.createElement('a');
    a.href = `${this.path}#${this.fragment}`;
    a.innerHTML = this.text;
    li.appendChild(a);
    return li;
  }
  
  add(item: Toc): void { throw new Error(errorNotSupportedOperation); }
  getParent(): Ul { throw new Error(errorNotSupportedOperation); }
  getDepth(): string { throw new Error(errorNotSupportedOperation); }
}

export class TocCompositeFactory {

  private headings: NodeListOf<HTMLElement>;
  private path: string;

  constructor(headings: NodeListOf<HTMLElement>, path: string) {
    this.headings = headings;
    this.path = path;
  }

  public createToc() : Toc {
    let queue = new Queue<HTMLElement>();
    this.headings.forEach(e => { queue.push(e); } );
  
    let item = queue.pop();
    let root = this.createRootNode(item);
    root.add(this.createLeaf(item));
    return this.createTocComposite(queue, item, root);
  }

  private createTocComposite(queue: Queue<HTMLElement>, preItem: HTMLElement, node: Toc): Toc {
    if (queue.empty()) {
      return node;
    }
  
    let item = queue.pop();
    if (this.shouldAddToSameNode(item, preItem)) {
      node.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, node);
    } else if (this.shouldAddToChildNode(item, preItem)) {
      let childNode = this.createNode(item, node);
      node.add(childNode);
      childNode.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, childNode);
    } else {
      let parentNode = this.searchNodeToAdd(node, item);
      parentNode.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, parentNode);
    }
  }

  private shouldAddToSameNode(item: HTMLElement, preItem: HTMLElement): boolean {
    return (item.tagName === preItem.tagName);
  }

  private shouldAddToChildNode(item: HTMLElement, preItem: HTMLElement): boolean {
    return (preItem.tagName < item.tagName);
  }

  private searchNodeToAdd(node: Toc, item: HTMLElement): Toc {
    // search parent node that item should be added to.
    let parentNode = node.getParent();
    while (item.tagName < parentNode.getDepth()) {
      parentNode = parentNode.getParent();
    }
    return parentNode;
  }

  private createRootNode(item: HTMLElement): Toc {
    return new Ul(item.tagName, null);
  }
  
  private createNode(item: HTMLElement, node: Toc | null): Toc {
    return new Ul(item.tagName, node);
  }
  
  private createLeaf(item: HTMLElement): Toc {
    return new Li(this.path, item.id, item.innerHTML);
  }
}