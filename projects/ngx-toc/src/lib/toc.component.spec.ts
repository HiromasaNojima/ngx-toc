import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxTocModule } from './toc.module';
@Component({
  template: `
      <div id="toc-target">
        <h1 id="h1-1">h1-1</h1>
      </div>
      <ngx-toc></ngx-toc>
  `
})
class TestDefaultValueComponent {}

describe('TocComponent(default value)', () => {
  let component: TestDefaultValueComponent;
  let fixture: ComponentFixture<TestDefaultValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestDefaultValueComponent ],
      imports: [ NgxTocModule, RouterTestingModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestDefaultValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  
  let toc = '<ul><li><a href="/#h1-1">h1-1</a></li></ul>';

  it(`should be ${toc}`, () => {
    let created = fixture.nativeElement.querySelector('ngx-toc');
    expect(created.innerHTML).toEqual(toc);
  });
});

@Component({
  template: `
      <div id="toc-target">
        <h1 id="h1-1">h1-1</h1>
        <h1 id="h1-2">h1-2</h1>
        <h2 id="h2-1">h2-1</h2>
        <h3 id="h3-1">h3-1</h3>
        <h1 id="h1-3">h1-3</h1>
        <h2 id="h2-2">h2-2</h2>
        <h1 id="h1-4">h1-4</h1>
      </div>
      <ngx-toc target="toc-target" [targetHeadings]="['h1', 'h2', 'h3']" path="/foo"></ngx-toc>
  `
})
class TestComponent {}

describe('TocComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent ],
      imports: [ NgxTocModule, RouterTestingModule ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  let toc = 
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

  it(`should be ${toc}`, () => {
    let created = fixture.nativeElement.querySelector('ngx-toc');
    expect(created.innerHTML).toEqual(toc);
  });
});