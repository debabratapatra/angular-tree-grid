import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgridBodyComponent } from './subgrid-body.component';

describe('SubgridBodyComponent', () => {
  let component: SubgridBodyComponent;
  let fixture: ComponentFixture<SubgridBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubgridBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubgridBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
