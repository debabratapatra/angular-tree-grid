import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCellActionsComponent } from './tree-cell-actions.component';

describe('TreeCellActionsComponent', () => {
  let component: TreeCellActionsComponent;
  let fixture: ComponentFixture<TreeCellActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCellActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCellActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
