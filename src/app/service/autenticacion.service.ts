import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import {ApiService} from './api.service'
import {Observable} from 'rxjs/Observable';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService{

  constructor(private apiService: ApiService,private http: HttpClient){}

    getTipoIdentificacion():Observable<any>{
      return this.apiService.ApiCall("GET","/tipoIdentificacion",null,null);
    }

    getGenero():Observable<any>{
      return this.apiService.ApiCall("GET","/genero",null,null);
    }
}
