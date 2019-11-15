import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoPedidosProcesoComponent } from './empleado-pedidos-proceso.component';

describe('EmpleadoPedidosProcesoComponent', () => {
  let component: EmpleadoPedidosProcesoComponent;
  let fixture: ComponentFixture<EmpleadoPedidosProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoPedidosProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoPedidosProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
