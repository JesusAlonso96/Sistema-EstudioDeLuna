import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoVentaComponent } from './empleado-venta.component';

describe('EmpleadoVentaComponent', () => {
  let component: EmpleadoVentaComponent;
  let fixture: ComponentFixture<EmpleadoVentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoVentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
