import { Queue } from "./queue";
import { Toc, Ul, Li, A } from "./toc-composite";


export class TocCompositeFactory {

  private headings: NodeListOf<HTMLElement>;
  private path: string;

  constructor(headings: NodeListOf<HTMLElement>, path: string) {
    this.headings = headings;
    this.path = path;
  }

  public createToc(): Toc {
    let queue = new Queue<HTMLElement>();
    this.headings.forEach(e => { queue.push(e); });

    let item = queue.pop();
    let root = this.createRootNode(item);
    root.add(this.createLi(item));
    return this.createTocComposite(queue, item, root);
  }

  private createTocComposite(queue: Queue<HTMLElement>, preItem: HTMLElement, node: Toc): Toc {
    if (queue.empty()) {
      return node;
    }

    let item = queue.pop();
    if (this.shouldAddToSameNode(item, preItem)) {
      node.add(this.createLi(item));
      return this.createTocComposite(queue, item, node);
    } else if (this.shouldAddChildNode(item, preItem)) {
      let childNode = this.createNode(item, node);
      childNode.add(this.createLi(item));
      node.getLastChild().add(childNode);
      return this.createTocComposite(queue, item, childNode);
    } else {
      let parentNode = this.searchNodeToAdd(node, item);
      parentNode.add(this.createLi(item));
      return this.createTocComposite(queue, item, parentNode);
    }
  }

  private shouldAddToSameNode(item: HTMLElement, preItem: HTMLElement): boolean {
    return (item.tagName === preItem.tagName);
  }

  private shouldAddChildNode(item: HTMLElement, preItem: HTMLElement): boolean {
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

  private createLi(item: HTMLElement): Toc {
    let li = new Li();
    li.add(this.createA(item));
    return li;
  }

  private createA(item: HTMLElement): Toc {
    return new A(this.path, item.id, item.innerHTML);
  }
}
