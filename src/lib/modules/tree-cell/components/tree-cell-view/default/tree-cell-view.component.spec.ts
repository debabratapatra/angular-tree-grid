import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCellViewComponent } from './tree-cell-view.component';

describe('TreeCellViewComponent', () => {
  let component: TreeCellViewComponent;
  let fixture: ComponentFixture<TreeCellViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCellViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCellViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
