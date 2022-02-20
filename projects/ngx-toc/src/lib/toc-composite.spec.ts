import { Component, Renderer2, Type } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { errorNotSupportedOperation, errorRootCallsGetParent, Li, TocCompositeFactory, Ul } from "./toc-composite";
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

describe('Li', () => {
  let li: Li;
  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [Renderer2]
    }).compileComponents();
  }));

  beforeEach(() => {
    li = new Li('/foo','bar', 'foobar');
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
  })

  it(`should be ${liStr}`, () => {
    expect(li.toHtml(renderer).outerHTML).toEqual(liStr);
  });

  it('should throw error if add() is called.', () => {
    expect(() => li.add(li)).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getParent() is called.', () => {
    expect(() => li.getParent()).toThrowError(errorNotSupportedOperation);
  });

  it('should throw error if getDepth() is called.', () => {
    expect(() => li.getDepth()).toThrowError(errorNotSupportedOperation);
  });
});

const toc = 
  '<ul>'
  + '<li><a href="/foo#h1-1">h1-1</a></li>'
  + '<li><a href="/foo#h1-2">h1-2</a></li>'
  + '<ul>'
    + '<li><a href="/foo#h2-1">h2-1</a></li>'
    + '<ul>'
      + '<li><a href="/foo#h3-1">h3-1</a></li>'
    + '</ul>'
  + '</ul>'
  + '<li><a href="/foo#h1-3">h1-3</a></li>'
  + '<ul>'
    + '<li><a href="/foo#h2-2">h2-2</a></li>'
  + '</ul>'
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
    root.add(new Li('/foo', 'h1-1', 'h1-1'));
    root.add(new Li('/foo', 'h1-2', 'h1-2'));
    let ulh2 = new Ul('H2', root);
    root.add(ulh2);
    ulh2.add(new Li('/foo', 'h2-1', 'h2-1'));
    let ulh3 = new Ul('H2', ulh2);
    ulh2.add(ulh3);
    ulh3.add(new Li('/foo', 'h3-1', 'h3-1'));
    root.add(new Li('/foo', 'h1-3', 'h1-3'));
    let ulh2twice = new Ul('H2', root);
    root.add(ulh2twice);
    ulh2twice.add(new Li('/foo', 'h2-2', 'h2-2'))
    root.add(new Li('/foo', 'h1-4', 'h1-4'))
    expect(toc).toEqual(root.toHtml(renderer).outerHTML);
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

const headingELements = '<h1 id="h1-1">h1-1</h1>'
  + '<h1 id="h1-2">h1-2</h1>'
  + '<h2 id="h2-1">h2-1</h2>'
  + '<h3 id="h3-1">h3-1</h3>'
  + '<h1 id="h1-3">h1-3</h1>'
  + '<h2 id="h2-2">h2-2</h2>'
  + '<h1 id="h1-4">h1-4</h1>'

describe('TocCompositeFactory', () => {

  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      providers: [Renderer2],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
  })

  it(`should be ${toc} created from ${headingELements}`, () => {
    let body = document.createElement('body');
    body.innerHTML = headingELements;
    let headings = body.querySelectorAll<HTMLElement>('h1, h2, h3');
    expect(new TocCompositeFactory(headings, '/foo').createToc().toHtml(renderer).outerHTML).toEqual(toc);
  });

});
