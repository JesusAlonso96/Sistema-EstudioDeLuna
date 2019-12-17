
export class Usuario{
    _id: String;
    nombre: String;
    username: String;
    ape_pat: String;
    ape_mat: String;
    email: String;
    telefono: Number;
    contrasena: String;
    rol: Number;
    rol_sec: Number;
    constructor(){
        this._id = '';
        this.nombre = this.username = this.ape_mat = this.ape_mat = this.email = this.contrasena = '';
        this.telefono = this.rol = this.rol_sec = 0;
    }
}