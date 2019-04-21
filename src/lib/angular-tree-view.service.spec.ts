import { TestBed } from '@angular/core/testing';

import { AngularTreeViewService } from './angular-tree-view.service';

describe('AngularTreeViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularTreeViewService = TestBed.get(AngularTreeViewService);
    expect(service).toBeTruthy();
  });
});
