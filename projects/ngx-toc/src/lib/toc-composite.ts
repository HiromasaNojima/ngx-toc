export interface Toc {
  toHtml(): HTMLElement;
}

export class Ul implements Toc {

  private items: Toc[];
  private depth: string;
  private parent: Ul | null;

  constructor(depth: string, parent: Ul | null) {
    this.items = [];
    this.depth = depth;
    this.parent = parent;
  }

  toHtml(): HTMLElement {
    console.log('aaa');
    let doc = document.createElement('ul');
    this.items.forEach(item => {
      doc.appendChild(item.toHtml());
    })
    return doc; 
  }

  add(item: Toc): void {
    this.items.push(item);
  }

  getDepth(): string {
    return this.depth;
  }

  getParent(): Ul {
    if (!this.parent) {
      throw new Error('ul is root but is called getParent().');
    }
    return this.parent;
  }

}

export class Li implements Toc {

  private id: string;
  private text: string;
  
  constructor(id: string, text: string) {
    this.id = id;
    this.text = text;
  }

  toHtml(): HTMLElement {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = '#' + this.id;
    a.innerHTML = this.text;
    li.appendChild(a);
    return li;
  }

}
