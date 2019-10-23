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

            this.router.navigate()
        }
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
                const trabajador = this.getTipoTrabajador();
                //si trabajador es un fotografo no puede ver lo de recepcionista
                if (trabajador == 0) {
                    if (this.url.includes('login') || this.url.includes('administrador') || this.url.includes('supervisor') || this.url.includes('recepcion')) {
                        return true;
                    }
                }


        }
        if (this.url.includes('login')) {
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
        return this.notHandleAuthentication();
    }
}