import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService,private http: HttpClient){}

    exportInternalOrder():Observable<any>{

      var headers = new HttpHeaders();
      headers.append("Application","UEhBTlRPTVhfV0VC");
      headers.append("idOrganizacion","365509c8-9596-4506-a5b3-487782d5876e");
      return this.http.get("http://localhost:8080/comercial/v1/tarifarios/plantilla_prestaciones", { headers: headers , params: null })
    
    }

    postCrearUsuario(user):Observable<any>{
      user.password=btoa(user.password1);
      user.photo=null;
      return this.apiService.ApiCallSinToken("POST","/usuarios/crearUsuario",user,null);
    }

    putActualizarUsuario(idUsuario,user):Observable<any>{
      return this.apiService.ApiCallConToken("PUT",`/usuarios/${idUsuario}/actualizarUsuario`,user,null);
    }

    getConsultaUsuario(page,perPage,valor,estado):Observable<any>{
      return this.apiService.ApiCallConToken("GET",`/usuarios/usuarios?page=${page}&perPage=${perPage}&cedulaCodigoUsuario=${valor}&estado=${estado}`,null,null);
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
