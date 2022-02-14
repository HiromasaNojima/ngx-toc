export class Queue<T> {
  private data: T[] = [];
  length(): number { return this.data.length; }
  push(item: T) { this.data.push(item); }
  pop(): T | null { 
    let t = this.data.shift(); 
    if(t) {
      return t;
    } else {
      return null;
    }
  }
}