import { TestBed } from '@angular/core/testing';

import { NgxTocService } from './ngx-toc.service';

describe('NgxTocService', () => {
  let service: NgxTocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxTocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
