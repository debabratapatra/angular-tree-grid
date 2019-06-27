import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgridHeadComponent } from './subgrid-head.component';

describe('SubgridHeadComponent', () => {
  let component: SubgridHeadComponent;
  let fixture: ComponentFixture<SubgridHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgridHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgridHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
