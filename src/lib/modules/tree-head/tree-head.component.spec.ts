import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeHeadComponent } from './tree-head.component';

describe('TreeHeadComponent', () => {
  let component: TreeHeadComponent;
  let fixture: ComponentFixture<TreeHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
