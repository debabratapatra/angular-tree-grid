import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeCellEditorComponent } from './tree-cell-editor.component';

describe('TreeCellEditorComponent', () => {
  let component: TreeCellEditorComponent;
  let fixture: ComponentFixture<TreeCellEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeCellEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
