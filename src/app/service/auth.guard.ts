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
              ){  console.log("Url Completa: ",this.router.url);
              }

  rolesUsu=[];
  rolesRut:any;
  entro=false;
  canActivate(route: ActivatedRouteSnapshot):Observable<boolean>{

        this._rolesService.getConsultarRolesPorRutas(route.url[0].path).subscribe(Response => {
          this.rolesRut=Response['data'];
        });


        return  this._rolesService.getConsultarRolesPorUsuario().map(Response => {
            this.rolesUsu=Response['data'];

            console.log(this.rolesUsu);
            console.log("Roles: ",route.data.roles);
            console.log("Url: ",route.url[0].path);

            console.log("Rutas: ", this.rolesRut);
            console.log("USUARIO: ", this.rolesUsu);
            console.log("Entro",this.auth.estaAutenticado());
            if(this.auth.estaAutenticado()){
              this.entro=false;
              this.rolesUsu.forEach(a => {
                this.rolesRut.forEach(b=> {
                  if(a.secuenciaRol==b.secuenciaRol){
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
