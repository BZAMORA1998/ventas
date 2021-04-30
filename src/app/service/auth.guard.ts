import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  autenticado;
  constructor(private auth: AuthService,
              private router:Router,
              ){
  
              }


  canActivate(route: ActivatedRouteSnapshot):boolean{

    console.log("Roles: ",route.data.roles);
    console.log("Url: ",route.url[0].path);
    var roles=["GEN","MOD","SEG"];
    if(this.auth.estaAutenticado() && route.data.roles!=null){
      var entro=false;
      route.data.roles.forEach(a => {
        roles.forEach(b=> {
          if(a==b){
            entro=true;
          }
        });
      });
      return entro;
    }else{
      this.router.navigateByUrl('/ventas/login');
      localStorage.setItem("autenticado",JSON.stringify(false));
      return false;
    }
  }
  
}
