import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServicioAutenticacionService } from '../servicio-autenticacion/servicio-autenticacion.service';

@Injectable()
export class AutenticacionGuard implements CanActivate {

    private url: string;
    private tipoUsuario;
    constructor(private authService: ServicioAutenticacionService, private router: Router) { }

    private manejarAutenticacion(): boolean {
        if (this.loginOHomeOCuentaInvalida()) {
            return false;
        }
        return true;
    }
    private getTipoUsuario() {
        return this.authService.getTipoUsuario();
    }
    private getTipoTrabajador() {
        return this.authService.getTipoTrabajador();
    }

    private loginOHomeOCuentaInvalida(): boolean {
        const usuario = this.getTipoUsuario();
        switch (usuario) {
            case 0:
                //const trabajador = this.getTipoTrabajador();
                //si trabajador es un fotografo no puede ver lo de recepcionista
                if (this.url.includes('login') || this.url.includes('admin') || this.url.includes('supervisor')) {
                    this.router.navigate(['/usuario/perfil']);
                    return true;
                }
                return false;
                break;
            case 1:
                if (this.url.includes('login') || this.url.includes('admin') || this.url.includes('usuario')) {
                    this.router.navigate(['/supervisor/perfil']);
                    return true;
                }
                return false;
                break;
            case 2:
                if (this.url.includes('login') || this.url.includes('supervisor') || this.url.includes('usuario')) {
                    this.router.navigate(['/admin/perfil']);
                    return true;
                }
                return false;
                break;



        }
    }
    private urlInvalida(): boolean {
        if (this.url.includes('usuario') || this.url.includes('admin') || this.url.includes('supervisor')) {
            return true;
        }
        return false;
    }
    private noManejarAutenticacion(): boolean {
        if (this.urlInvalida()) {
            this.router.navigate(['/login']);
            return true;
        }
        
        return false;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.url = state.url;
        const usuario = this.authService.getTipoUsuario();
        if (this.authService.estaAutenticado()) {
            return this.manejarAutenticacion();
        }
        return this.noManejarAutenticacion()

    }
}