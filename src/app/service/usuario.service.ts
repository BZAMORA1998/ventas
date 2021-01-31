import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService,private http: HttpClient){}

    postCrearUsuario(user):Observable<any>{
      user.password=btoa(user.password1);
      user.photo=null;
      return this.apiService.ApiCallSinToken("POST","/usuarios/crearUsuario",user,null);
    }

    putActualizarUsuario(idUsuario,user):Observable<any>{
      return this.apiService.ApiCallConToken("PUT",`/usuarios/${idUsuario}/actualizarUsuario`,user,null);
    }

    getConsultaUsuario(page,perPage):Observable<any>{
      return this.apiService.ApiCallConToken("GET",`/usuarios/usuarios?page=${page}&perPage=${perPage}`,null,null);
    }

    deleteUsuario(idUsuario):Observable<any>{
      return this.apiService.ApiCallConToken("DELETE",`/usuarios/${idUsuario}/usuarios`,null,null);
    }

    getUsuarioXId(idUsuario):Observable<any>{
      return this.apiService.ApiCallConToken("GET",`/usuarios/${idUsuario}/basica`,null,null);
    }

    postPhoto(photo,idPersona):Observable<any>{
      const data: FormData = new FormData();
      data.append('idPersona',idPersona);
      data.append('photo',photo);

      var headers = new HttpHeaders();
      headers.append('reportProgress',JSON.stringify(true));
      headers.append('responseType','text');

      return this.apiService.ApiCallMultiFormSinToken("POST",`/usuarios/photo`,data,headers);
    }
}
