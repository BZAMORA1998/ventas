import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  postRol(nombre) {
    var json={
      "nombre":nombre
    }
    return this.apiService.ApiCallSpring("POST","/roles",json,null);
  }
  postGuardarRutasPorRol(secuenciaRol, data) {
    var json = JSON.stringify(data);
    console.log("JSON",json);
    return this.apiService.ApiCallSpring("PUT","/roles/ruta/usuario/"+secuenciaRol,json,null);
  }

  constructor(private apiService: ApiService,private http: HttpClient){}
  
  getConsultarRolesPorUsuario() {
    return this.apiService.ApiCallSpring("GET","/roles/usuario",null,null);
  }

  getConsultarRoles() {
    return this.apiService.ApiCallSpring("GET","/roles",null,null);
  }
  
  getConsultarRolesPorRutas(ruta) {
    return this.apiService.ApiCallSpring("GET",`/roles/ruta?ruta=${ruta}`,null,null);
  }

  getConsultarRutasPorRol(idRol) {
    return this.apiService.ApiCallSpring("GET",`/roles/ruta/usuario/${idRol}`,null,null);
  }

}
