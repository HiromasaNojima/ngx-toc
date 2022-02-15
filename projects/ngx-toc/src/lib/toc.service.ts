import { Injectable } from '@angular/core';
import { Queue } from './queue';
import { Li, Toc, Ul } from './toc-composite';

@Injectable({
  providedIn: 'root'
})
export class TocService {

  constructor() { }

  createToc(targetId: string, terminalHeading: string): HTMLElement{
    let target = document.getElementById(targetId);
    if (!target) {
      throw new Error('failed to get element. target_element_id = ' + targetId);
    }

    // あとでここの取得ちゃんとやる、エラーハンドリング
    let headings = target.querySelectorAll<HTMLElement>("h1, h2, h3");
    if (!headings) {
      throw new Error('there is no heading elements. terminal_heading = ');
    }

    let queue = new Queue<HTMLElement>();
    headings.forEach(e => { queue.push(e); } );

    let pre = queue.pop();
    let ul = this.createNode(pre, null);
    let item = new Li(pre.id, pre.innerHTML);
    ul.add(item);
    return this.createTocComposite(queue, pre, ul).toHtml();
  }

  private createTocComposite(queue: Queue<HTMLElement>, preItem: HTMLElement, node: Ul): Toc {
    if (queue.empty()) {
      return node;
    }

    let item = queue.pop();
    if (item.tagName === preItem.tagName) {
      node.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, node);
    } else if (preItem.tagName < item.tagName) {
      let childNode = this.createNode(item, node);
      node.add(childNode);
      childNode.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, childNode);
    } else {
      // search parent item should be added to.
      let parent = node.getParent();
      while (item.tagName < parent.getDepth()) {
        parent = parent.getParent();
      }
  
      parent.add(this.createLeaf(item));
      return this.createTocComposite(queue, item, parent);
    }
  }

  private createNode(item: HTMLElement, node: Ul | null): Ul {
    return new Ul(item.tagName, node);
  }

  private createLeaf(item: HTMLElement): Toc {
    return new Li(item.id, item.innerHTML);
  }
}
