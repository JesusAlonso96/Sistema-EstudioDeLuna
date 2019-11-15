import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetallesProductoComponent } from './modal-detalles-producto.component';

describe('ModalDetallesProductoComponent', () => {
  let component: ModalDetallesProductoComponent;
  let fixture: ComponentFixture<ModalDetallesProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDetallesProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDetallesProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
