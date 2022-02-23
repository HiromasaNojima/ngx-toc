import { Component, Renderer2, Type } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { A, errorNotSupportedOperation, errorRootCallsGetParent, Li, Toc, Ul } from "./toc-composite";
import { RouterTestingModule } from '@angular/router/testing';
@Component({
  template: `
      <div id="toc-target">
        <h1 id="h1-1">h1-1</h1>
      </div>
  `
})
class TestComponent {
  constructor(private renderer: Renderer2) {}
}

const liStr = '<li><a href="/foo#bar">foobar</a></li>';

function createLiWithA(path: string, fragment: string, text: string): Toc {
  let li = new Li();
  li.add(new A(path, fragment, text));
  return li;
}

describe('Li', () => {
  let li: Toc;
  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [Renderer2]
    }).compileComponents();
  }));

  beforeEach(() => {
    li = createLiWithA('/foo', 'bar', 'foobar');
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
  })

  it(`should be ${liStr}`, () => {
    expect(li.toHtml(renderer).outerHTML).toEqual(liStr);
  });

  it('should throw error if getParent() is called.', () => {
    expect(() => li.getParent()).toThrowError(errorNotSupportedOperation);
  });
  
  it('should throw error if getDepth() is called.', () => {
    expect(() => li.getDepth()).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getLastChild() is called.', () => {
    expect(() => li.getLastChild()).toThrowError(errorNotSupportedOperation);
  });
});

const toc = 
  '<ul>'
  + '<li><a href="/foo#h1-1">h1-1</a></li>'
  + '<li>'
    + '<a href="/foo#h1-2">h1-2</a>'
    + '<ul>'
      + '<li>' 
        +'<a href="/foo#h2-1">h2-1</a>'
        + '<ul>'
          + '<li><a href="/foo#h3-1">h3-1</a></li>'
        + '</ul>'
      + '</li>'
    + '</ul>'
  + '</li>'
  + '<li>' 
    + '<a href="/foo#h1-3">h1-3</a>'
    + '<ul>'
      + '<li><a href="/foo#h2-2">h2-2</a></li>'
   + '</ul>'
  + '</li>'
  + '<li><a href="/foo#h1-4">h1-4</a></li>'
+ '</ul>';

describe('Ul', () => {
  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [Renderer2]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
  })

  it(`should be ${toc}`, () => {
    let root = new Ul('H1', null);
    root.add(createLiWithA('/foo', 'h1-1', 'h1-1'));
    let li1 = createLiWithA('/foo', 'h1-2', 'h1-2');
    root.add(li1);
    let ulh2 = new Ul('H2', root);
    li1.add(ulh2);

    let li2 = createLiWithA('/foo', 'h2-1', 'h2-1');
    ulh2.add(li2);
    let ulh3 = new Ul('H3', ulh2);
    li2.add(ulh3);
    ulh3.add(createLiWithA('/foo', 'h3-1', 'h3-1'));
    
    let li3 = createLiWithA('/foo', 'h1-3', 'h1-3');
    root.add(li3);
    let ulh2twice = new Ul('H2', root);
    li3.add(ulh2twice);
    ulh2twice.add(createLiWithA('/foo', 'h2-2', 'h2-2'))
    root.add(createLiWithA('/foo', 'h1-4', 'h1-4'))

    expect(root.toHtml(renderer).outerHTML).toEqual(toc);
  });

  it('should be li', () => {
    let root = new Ul('H1', null);
    root.add(createLiWithA('/foo', 'h1-1', 'h1-1'));
    let lastChild = new Li();
    root.add(lastChild);
    expect(root.getLastChild()).toEqual(lastChild);
  });

  it('should throw error if root node calls getParent()', () => {
    let root = new Ul('H1', null);
    expect(() => root.getParent()).toThrowError(errorRootCallsGetParent);
  });

  it('should be root if child node calls getParent()', () => {
    let root = new Ul('H1', null);
    let child = new Ul('H2', root);
    root.add(child);
    expect(child.getParent()).toEqual(root);
  });

  it('should be child if grandchild node calls getParent()', () => {
    let root = new Ul('H1', null);
    let child = new Ul('H2', root);
    root.add(child);
    let grandchild = new Ul('H3', child);
    child.add(grandchild);
    expect(grandchild.getParent()).toEqual(child);
  });

});

describe('a', () => {
  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;
  let a: Toc;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [Renderer2]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
    a = new A('/foo', 'h1-1', 'h1-1');
  })

  const aStr = '<a href="/foo#h1-1">h1-1</a>'

  it(`should be ${aStr}`, () => {
    expect(a.toHtml(renderer).outerHTML).toEqual(aStr);
  })

  it('should throw error if add() is called.', () => {
    let a = new A('/foo', 'h1-1', 'h1-1');
    expect(() => a.add(a)).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getParent() is called.', () => {
    expect(() => a.getParent()).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getDepth() is called.', () => {
    expect(() => a.getDepth()).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getLastChild() is called.', () => {
    expect(() => a.getLastChild()).toThrowError(errorNotSupportedOperation);
  });
  
});