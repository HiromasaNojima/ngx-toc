import { Component, Renderer2, Type } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TocService } from './toc.service';

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

describe('TocService', () => {
  
  let service: TocService;
  let renderer: Renderer2;
  let fixture: ComponentFixture<TestComponent>;
  
  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [Renderer2]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    fixture = TestBed.createComponent(TestComponent);
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<Renderer2>);
    service = TestBed.inject(TocService);
    spyOn(renderer, 'createElement').and.callThrough();
    spyOn(renderer, 'appendChild').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should throw error if calls tocService.createToc('toc-target', ['div'], '/', renderer)", () => {
    let error = "[ngx-toc] targetHeadings has not-heading tag. targetHeadings = div, invalid element = div. acceptable tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']"
    expect(() => service.createToc('toc-target', ['div'], '/foo', renderer)).toThrowError(error);
  });

  it('should throw error if document.getElementById returns empty.', () => {
    document.getElementById = jasmine.createSpy('getElementById').and.returnValue('');
    let error = '[ngx-toc] failed to get element by id. targetId = toc-target';
    expect(() => service.createToc('toc-target', ['h1'], '/foo', renderer)).toThrowError(error);
  });

  it('should throw error if there are no headings', () => {
    var dummyElement = document.createElement('div');
    dummyElement.id = 'toc-target';
    document.getElementById = jasmine.createSpy('getElementById').and.returnValue(dummyElement);
    
    let error = '[ngx-toc] there are no heading elements. targetId = toc-target'
    expect(() => service.createToc('toc-target', ['h1'], '/foo', renderer)).toThrowError(error);
  });
    
});