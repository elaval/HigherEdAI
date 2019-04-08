import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinoESComponent } from './destino-es.component';

describe('DestinoESComponent', () => {
  let component: DestinoESComponent;
  let fixture: ComponentFixture<DestinoESComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestinoESComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoESComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
