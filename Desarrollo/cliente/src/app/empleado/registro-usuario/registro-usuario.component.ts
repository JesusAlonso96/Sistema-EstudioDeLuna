import { Component, OnInit } from '@angular/core';

import { EstadosService } from '../../comun/servicios/estados.service';
import { Estado } from 'src/app/comun/modelos/estado.model';
import { Municipio } from 'src/app/comun/modelos/municipio.model';
import { Cliente } from '../../comun/modelos/cliente.model';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent implements OnInit {
  conFactura: string;
  estados: Estado[];
  estado: Estado;
  municipios: Municipio[];
  municipio: Municipio;
  cliente: Cliente;
  cargando: boolean;
  constructor(private estadosService: EstadosService) {
    
  }

  ngOnInit() {
    this.cliente = new Cliente();
    this.cliente.estado = '';
    this.conFactura = 'No';
    this.cargando = false;
    this.estadosService.obtenerEstados().subscribe(
      (estados) => {
        this.estados = estados;
      },
      (err) => {
        console.log(err);
      }
    )
  }
  onChange(e) {
    this.conFactura = e.checked ? 'Si' : 'No';
  }
  
  buscarMunicipios(){
    this.cliente.estado = this.estado.nombre;
    this.cargando = true;
    this.estadosService.obtenerMunicipios(this.estado._id).subscribe(
      (municipios)=>{
        this.cargando = false;
        this.municipios = municipios;
      },
      (err)=>{
        console.log(err);
      }
    )

  }
  setMunicipio(){
    this.cliente.municipio = this.municipio.nombre;
  }
}
