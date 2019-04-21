import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularTreeViewComponent } from './angular-tree-view.component';

describe('AngularTreeViewComponent', () => {
  let component: AngularTreeViewComponent;
  let fixture: ComponentFixture<AngularTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
