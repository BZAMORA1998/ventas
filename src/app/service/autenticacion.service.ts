import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {ApiService} from './api.service'
import {Observable} from 'rxjs/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService{

  URL_API = environment.apiUrl;
  
  constructor(private apiService: ApiService,private http: HttpClient){}

    /**
     * @author Bryan Zamora
     * @param user 
     * @param password 
     * @description Autenticacion de usuario
     */
    postAutenticacion(user,password):Observable<any>{
      var auth ="Basic "+ btoa(user+":"+password);
      const headers = new HttpHeaders({
        'Authorization': auth,
      });
      return this.apiService.ApiCall("POST","/autenticacion/login",null,headers);
    } 
}
