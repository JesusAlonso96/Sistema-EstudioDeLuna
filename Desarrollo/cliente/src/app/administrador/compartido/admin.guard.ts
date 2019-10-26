import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ServicioAutenticacionService } from 'src/app/autenticacion/servicio-autenticacion/servicio-autenticacion.service';

@Injectable()
export class AdminGuard implements CanActivate{

    private url: string;

    constructor(private autService: ServicioAutenticacionService, private router: Router){}

    private manejarAutenticacion(): boolean{
        if(this.urlInvalida()){
            this.router.navigate(['/admin/perfil']);
            console.log('entre');
            return false;
        }
        return true;
    }
    private notHandleAuthentication(): boolean{
        if(this.urlInvalida()){
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    private urlInvalida(): boolean{
        if(this.url.includes('login') || this.url.includes('usuario') || this.url.includes('supervisor')){
            return true;
        }
        return false;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        this.url = state.url;
        if(this.autService.estaAutenticado()){
            return this.manejarAutenticacion();
        }
        return this.notHandleAuthentication();
    }


}