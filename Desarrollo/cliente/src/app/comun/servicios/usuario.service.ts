import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    constructor(private http: HttpClient) { }
    //post
    
    //get
    public obtenerUsuario(id): Observable<any>{
        return this.http.get(`/api/v1/usuarios/obtenerUsuario/${id}`);
    }
    public crearAsistencia(id): Observable<any>{
        return this.http.post(`/api/v1/usuarios/crearAsistencia/${id}`,null);
    }
}