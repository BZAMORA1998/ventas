import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RolesService } from './roles.service';
import "rxjs/add/operator/map"; 

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  autenticado;
  constructor(private auth: AuthService,
              private router:Router,
              private _rolesService:RolesService
              ){
              }

  roles=[];
  entro=false;
  canActivate(route: ActivatedRouteSnapshot):Observable<boolean>{
    return  this._rolesService.getConsultarRolesPorUsuario().map(Response => {
        this.roles=Response['data'];
        console.log(this.roles);
        console.log("Roles: ",route.data.roles);
        console.log("Url: ",route);
        console.log("Url Completa: ",this.router.navigateByUrl);
        if(this.auth.estaAutenticado() && route.data.roles!=null){
          this.entro=false;
          route.data.roles.forEach(a => {
            this.roles.forEach(b=> {
              if(a==b.abreviatura){
                this.entro=true;
              }
            });
          });
        }

        if(this.entro){
          return this.entro;
        }else{
          localStorage.setItem("autenticado",JSON.stringify(false));
          this.router.navigate(['../ventas/login']);
          return false;
        }
       
  });
  }
}
