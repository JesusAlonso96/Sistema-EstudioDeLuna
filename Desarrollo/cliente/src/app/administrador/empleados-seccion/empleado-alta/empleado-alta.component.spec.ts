import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoAltaComponent } from './empleado-alta.component';

describe('EmpleadoAltaComponent', () => {
  let component: EmpleadoAltaComponent;
  let fixture: ComponentFixture<EmpleadoAltaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoAltaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
