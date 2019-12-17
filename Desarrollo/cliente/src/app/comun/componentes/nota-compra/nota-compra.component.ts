import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from '../../modelos/pedido.model';

@Component({
  selector: 'app-nota-compra',
  templateUrl: './nota-compra.component.html',
  styleUrls: ['./nota-compra.component.scss']
})
export class NotaCompraComponent implements OnInit {
@Input() pedido: Pedido;
  constructor() { }

  ngOnInit() {
  }
  generarTicket(){
    
  }

}
