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


  canActivate():boolean{
    if(this.auth.estaAutenticado()){
      return true;
    } else{
      this.router.navigateByUrl('/ventas/login');
      localStorage.setItem("autenticado",JSON.stringify(false));
      return false;
    }
  }
  
}
