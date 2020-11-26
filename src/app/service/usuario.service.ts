import { HttpClient } from '@angular/common/http';
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
      return this.apiService.ApiCallSinToken("POST","/usuariosSistema/crearUsuario",user,null);
    }

    putActualizarUsuario(idUsuario,user):Observable<any>{
      return this.apiService.ApiCallConToken("PUT",`/usuariosSistema/${idUsuario}/actualizarUsuario`,user,null);
    }

    getConsultaUsuario(page,perPage):Observable<any>{
      return this.apiService.ApiCallConToken("GET",`/usuariosSistema/usuarios?page=${page}&perPage=${perPage}`,null,null);
    }

    deleteUsuario(idUsuario):Observable<any>{
      return this.apiService.ApiCallConToken("DELETE",`/usuariosSistema/${idUsuario}/usuarios`,null,null);
    }

    getUsuarioXId(idUsuario):Observable<any>{
      return this.apiService.ApiCallConToken("GET",`/usuariosSistema/${idUsuario}/basica`,null,null);
    }
}