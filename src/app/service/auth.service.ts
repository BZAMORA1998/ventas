import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }
  
  loginP(user,password) {
    var auth ="Basic "+ btoa(user+":"+password);
    
    const headers = new HttpHeaders({
      'Authorization': auth
    });
    return this.apiService.ApiLogin("POST","/autenticacion/login",null,headers)
      .pipe(map(resp => {
        
        localStorage.setItem("autenticado",JSON.stringify(true));
        localStorage.setItem("data",JSON.stringify(resp["data"]));

        return resp;
      }));
  }

  estaAutenticado(): boolean {
    return JSON.parse(localStorage.getItem('autenticado'));
  }
}
