import { Component, Renderer2, Type } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { TocCompositeFactory } from "./toc-composite-factory";
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

const headingELements = '<h1 id="h1-1">h1-1</h1>'
  + '<h1 id="h1-2">h1-2</h1>'
  + '<h2 id="h2-1">h2-1</h2>'
  + '<h3 id="h3-1">h3-1</h3>'
  + '<h1 id="h1-3">h1-3</h1>'
  + '<h2 id="h2-2">h2-2</h2>'
  + '<h1 id="h1-4">h1-4</h1>';

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

describe('TocCompositeFactory', () => {

  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
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
  });

  it(`should be ${toc} created from ${headingELements}`, () => {
    let body = document.createElement('body');
    body.innerHTML = headingELements;
    let headings = body.querySelectorAll<HTMLElement>('h1, h2, h3');
    expect(new TocCompositeFactory(headings, '/foo').createToc().toHtml(renderer).outerHTML).toEqual(toc);
  });

});
