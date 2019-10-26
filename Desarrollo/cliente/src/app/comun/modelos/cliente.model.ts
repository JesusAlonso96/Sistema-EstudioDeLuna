export class Cliente {
    nombre: string;
    username: string;
    ape_pat: string;
    ape_mat: string;
    email: string;
    telefono: number;
    contrasena: string;
    razonSocial: string;
    rfc:string;
    direccion: string;
    colonia:string;
    municipio:string;
    estado:string;
    cp:number;
    num_ext:number;
    num_int:number;
    //pedidos: Pedido;
    fecha_registro:Date;
    constructor(){
        this.nombre =  "";
    }
}