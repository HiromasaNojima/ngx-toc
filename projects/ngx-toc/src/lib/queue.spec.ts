import { errorNoElements, Queue } from './queue';

describe('Queue', () => {
  let queue: Queue<number>;
  beforeEach(() => {
    queue = new Queue<number>();
  });

  it('should be empty', () => {
    expect(queue.empty()).toBeTruthy();
  })

  it('length should be 0', ()=> {
     expect(queue.length()).toEqual(0);
  });

  it('length should be 1 after push(1)', ()=> {
    queue.push(1);
    expect(queue.length()).toEqual(1);
  });

  it('length should not be empty after push(1)', ()=> {
    queue.push(1);
    expect(queue.empty()).toBeFalse();
  });

  it('should be 1 after push(1), pop()', () => {
    queue.push(1);
    let pop = queue.pop();
    expect(pop).toEqual(1);
  });

  it('should be 1 after push(1), push(2), pop()', () => {
    queue.push(1);
    queue.push(2);
    let pop = queue.pop();
    expect(pop).toEqual(1);
  });

  it('length should be 2 after push(1), push(2)', () => {
    queue.push(1);
    queue.push(2);
    expect(queue.length()).toEqual(2);
  });

  it('length should be 1 after push(1), push(2), pop()', () => {
    queue.push(1);
    queue.push(2);
    queue.pop();
    expect(queue.length()).toEqual(1);
  });

  it('should throw error when pop() with 0 length', () => {
    expect(() => queue.pop()).toThrowError(errorNoElements);
  });
});
