import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCellComponent } from './tree-cell.component';

describe('TreeCellComponent', () => {
  let component: TreeCellComponent;
  let fixture: ComponentFixture<TreeCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
