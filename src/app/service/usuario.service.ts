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
      return this.apiService.ApiCall("POST","/usuarios/crearUsuario",user,null);
    }

    putActualizarUsuario(idUsuario,user):Observable<any>{
      return this.apiService.ApiCall("PUT",`/usuarios/${idUsuario}/actualizarUsuario`,user,null);
    }

    getConsultaUsuario(page,perPage,valor,estado):Observable<any>{
      return this.apiService.ApiCall("GET",`/usuarios?page=${page}&perPage=${perPage}&cedulaCodigoUsuario=${valor}&estado=${estado}`,null,null);
    }

    deleteUsuario(idUsuario):Observable<any>{
      return this.apiService.ApiCall("PUT",`/usuarios/${idUsuario}`,null,null);
    }

    getUsuarioXId(idUsuario):Observable<any>{
      return this.apiService.ApiCall("GET",`/usuarios/${idUsuario}/basica`,null,null);
    }

    postPhoto(photo,idPersona):Observable<any>{
      const data: FormData = new FormData();
      data.append('idPersona',idPersona);
      data.append('photo',photo);

      var headers = new HttpHeaders();
      headers.append('reportProgress',JSON.stringify(true));
      headers.append('responseType','text');

      return this.apiService.ApiCallMultiForm("POST",`/usuarios/photo`,data,headers);
  }
}
