import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoNotificacionesComponent } from './empleado-notificaciones.component';

describe('EmpleadoNotificacionesComponent', () => {
  let component: EmpleadoNotificacionesComponent;
  let fixture: ComponentFixture<EmpleadoNotificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoNotificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoNotificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
