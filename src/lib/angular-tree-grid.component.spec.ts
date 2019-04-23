import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTreeGridComponent } from './angular-tree-grid.component';

describe('AngularTreeViewComponent', () => {
  let component: AngularTreeGridComponent;
  let fixture: ComponentFixture<AngularTreeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTreeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTreeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
