import { TestBed } from '@angular/core/testing';

import { AngularTreeGridService } from './angular-tree-grid.service';

describe('AngularTreeGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularTreeGridService = TestBed.get(AngularTreeGridService);
    expect(service).toBeTruthy();
  });
});
