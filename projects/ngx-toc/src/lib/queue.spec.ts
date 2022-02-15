import { Queue } from './queue';

describe('Queue', () => {
  let queue: Queue<number>;
  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should be empty', () => {
    expect(true).toEqual(queue.empty());
  })

  it('length should be 0', ()=> {
     expect(0).toEqual(queue.length());
  });

  it('length should be 1 after push(1)', ()=> {
    queue.push(1);
    expect(1).toEqual(queue.length());
  });

  it('length should not be empty after push(1)', ()=> {
    queue.push(1);
    expect(false).toEqual(queue.empty());
  });

  it('should be 1 after push(1), pop()', () => {
    queue.push(1);
    let pop = queue.pop();
    expect(1).toEqual(pop!);
  });

  it('should be 1 after push(1), push(2), pop()', () => {
    queue.push(1);
    queue.push(2);
    let pop = queue.pop();
    expect(1).toEqual(pop!);
  });

  it('length should be 2 after push(1), push(2)', () => {
    queue.push(1);
    queue.push(2);
    expect(2).toEqual(queue.length());
  });

  it('length should be 1 after push(1), push(2), pop()', () => {
    queue.push(1);
    queue.push(2);
    queue.pop();
    expect(1).toEqual(queue.length());
  });

  it('should be null when pop() with 0 length', () => {
    let pop = queue.pop();
    expect(pop).toBeNull();
  });
});
