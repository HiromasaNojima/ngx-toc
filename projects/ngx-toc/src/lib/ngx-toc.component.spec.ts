import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTocComponent } from './ngx-toc.component';

describe('NgxTocComponent', () => {
  let component: NgxTocComponent;
  let fixture: ComponentFixture<NgxTocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxTocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxTocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
