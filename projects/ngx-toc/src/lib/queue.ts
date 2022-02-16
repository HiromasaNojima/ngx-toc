export const errorNoElements = '[ngx-toc] Queue.pop() is called when it has no elements.'
export class Queue<T> {
  private data: T[] = [];
  empty(): boolean { return (this.data.length === 0); }
  length(): number { return this.data.length; }
  push(item: T) { this.data.push(item); }
  pop(): T { 
    let t = this.data.shift(); 
    if(t) {
      return t;
    } else {
      throw new Error(errorNoElements);
    }
  }
}