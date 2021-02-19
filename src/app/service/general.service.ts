import { Injectable} from '@angular/core';
import {ApiService} from './api.service'
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GeneralService{

  constructor(private apiService: ApiService,private http: HttpClient){}

    getTipoIdentificacion():Observable<any>{
      return this.apiService.ApiCall("GET","/general/tipoIdentificacion",null,null);
    }

    getGenero():Observable<any>{
      return this.apiService.ApiCall("GET","/general/genero",null,null);
    }
}
