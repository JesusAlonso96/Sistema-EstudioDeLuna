import { Familia } from './familia.model';

export class Producto{
    _id: String;
    nombre:String;
    precio: Number;
    num_fotos: Number;
    familia: Familia;
    b_n: Boolean;
    c_r: Boolean;
    c_ad: Boolean;
    descripcion: String;
    constructor(){
        this.nombre = '';
        this.precio = 0;
        this.familia = new Familia();
        this.num_fotos = 0;
        this.b_n = this.c_r = this.c_ad = false;
    }
}
