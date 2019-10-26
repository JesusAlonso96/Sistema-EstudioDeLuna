import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoPerfilComponent } from './empleado-perfil.component';

describe('EmpleadoPerfilComponent', () => {
  let component: EmpleadoPerfilComponent;
  let fixture: ComponentFixture<EmpleadoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
