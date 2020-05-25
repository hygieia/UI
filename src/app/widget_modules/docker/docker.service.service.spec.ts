import { TestBed } from '@angular/core/testing';

import { Docker.ServiceService } from './docker.service.service';

describe('Docker.ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Docker.ServiceService = TestBed.get(Docker.ServiceService);
    expect(service).toBeTruthy();
  });
});
