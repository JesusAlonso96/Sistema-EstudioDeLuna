import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../modelos/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {

    constructor(private http: HttpClient) { }
    //post
    public registrarCliente(cliente: Cliente): Observable<any> {
        return this.http.post('/api/v1/clientes/registrar',cliente);
    }
    //get
    public obtenerClientes(): Observable<any>{
        return this.http.get('/api/v1/clientes');
    }
    public obtenerClientePorEmailYNombre(nombre,email): Observable<any>{
        return this.http.get(`/api/v1/clientes/obtenerClientePorEmailNombre/${nombre}/${email}`);
    }
    
}