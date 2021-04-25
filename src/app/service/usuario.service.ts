import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  putActivarOInactivarUsuario(secuenciaUsuario: any) {
    return this.apiService.ApiCallSpring("PUT",`/usuarios/activarOInactivarUsuario/${secuenciaUsuario}`,null,null,true);
  }
  getConsultarUsuarioDisponible(primerNombre: string, segundoNombre: string, primerApellido: string, segundoApellido: string) {
    return this.apiService.ApiCallSpring("GET",`/usuarios/usuarioDisponible?primerNombre=${primerNombre}&segundoNombre=${segundoNombre}&primerApellido=${primerApellido}&segundoApellido=${segundoApellido}`,null,null,true);
  }

  constructor(private apiService: ApiService,private http: HttpClient){}

    postCrearUsuario(user):Observable<any>{
      user.password=btoa(user.password1);
      user.photo=null;
      return this.apiService.ApiCallSpring("POST","/usuarios/crearUsuario",user,null,true);
    }

    postRecuperarContrasena(correo):Observable<any>{

      const objCorreo={
        "correo":correo
      }

      return this.apiService.ApiCallSpring("POST","/usuarios/recuperarContrasena",objCorreo,null,false);
    }

    putActualizarUsuario(idUsuario,user):Observable<any>{
      return this.apiService.ApiCallSpring("PUT",`/usuarios/${idUsuario}/actualizarUsuario`,user,null,true);
    }

    getConsultaUsuario(page,perPage,valor,estado):Observable<any>{
      return this.apiService.ApiCallSpring("GET",`/usuarios?page=${page}&perPage=${perPage}&cedulaCodigoUsuario=${valor}&estado=${estado}`,null,null,true);
    }

    getUsuarioXId(idUsuario):Observable<any>{
      return this.apiService.ApiCallSpring("GET",`/usuarios/${idUsuario}/basica`,null,null,true);
    }

    postPhoto(photo,idPersona):Observable<any>{
      const data: FormData = new FormData();
      data.append('idPersona',idPersona);
      data.append('photo',photo);

      var headers = new HttpHeaders();
      headers.append('reportProgress',JSON.stringify(true));
      headers.append('responseType','text');

      return this.apiService.ApiCallMultiFormSpring("POST",`/usuarios/photo`,data,headers);
  }
}
