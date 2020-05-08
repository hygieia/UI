import { TestBed, inject } from '@angular/core/testing';

import { PaginationWrapperService } from './pagination-wrapper.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PaginationWrapperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, HttpClientModule],
    providers: [PaginationWrapperService]

  }));

  it('should be created', () => {
    const service: PaginationWrapperService = TestBed.get(PaginationWrapperService);
    expect(service).toBeTruthy();
  });

});
