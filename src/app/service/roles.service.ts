import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private apiService: ApiService,private http: HttpClient){}

  getConsultarRolesPorUsuario() {
    return this.apiService.ApiCallSpring("GET","/roles",null,null);
  }
}
