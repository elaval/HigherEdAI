import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigenESComponent } from './origen-es.component';

describe('OrigenESComponent', () => {
  let component: OrigenESComponent;
  let fixture: ComponentFixture<OrigenESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrigenESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigenESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
