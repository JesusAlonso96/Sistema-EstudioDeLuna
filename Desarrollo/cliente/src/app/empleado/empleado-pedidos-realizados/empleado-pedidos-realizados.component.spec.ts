import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoPedidosRealizadosComponent } from './empleado-pedidos-realizados.component';

describe('EmpleadoPedidosRealizadosComponent', () => {
  let component: EmpleadoPedidosRealizadosComponent;
  let fixture: ComponentFixture<EmpleadoPedidosRealizadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoPedidosRealizadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoPedidosRealizadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
