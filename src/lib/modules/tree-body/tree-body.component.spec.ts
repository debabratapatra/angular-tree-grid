import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeBodyComponent } from './tree-body.component';

describe('TreeBodyComponent', () => {
  let component: TreeBodyComponent;
  let fixture: ComponentFixture<TreeBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
