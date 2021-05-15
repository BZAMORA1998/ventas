import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { RolesService } from 'src/app/service/roles.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-listar-ususarios',
  templateUrl: './listar-ususarios.component.html',
  styleUrls: ['./listar-ususarios.component.css'],
  providers:[UsuarioService,GeneralService,RolesService]
})
export class ListarUsusariosComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _generalService:GeneralService,
    private _rolesService:RolesService) { }

  public data=[
    {
        numeroIdentificacion: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        usuario: "",
        fechaNacimiento: null,
        codigoTipoIdentificacion: null,
        codigoGenero: null,
        secuenciaUsuarioSistema: 0,
        esActivo:"S"
    }];

  public dataAct={
    numeroIdentificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    secuenciaTipoIdentificacion: 0,
    secuenciaGenero: 0,
    fechaNacimiento:null,
    usuario:"",
    secuenciaUsuarioSistema:0,
    rolSistema:""
  }

  public data2:any;
ngOnInit(): void {
  this.data=null;
  this.listarUsuario();
}

getpaginacion(page){
  this.page=page;
  this.listarUsuario();
}

/*
*Valida si es vacio
*/
validarVacio(target){
  if(target=="")
   this.listarUsuario();
};

public page:Number=1;
public perPage:Number=5;
public totalRows:Number=0;
public mostrarPag:Boolean=false;
public valor:String="";
public estado:String="TODOS";
estadoUsuario(){
  console.log(this.estado);
  this.listarUsuario();
}

guardar(){
  console.log(this.rolesElimnado);
  $(document).ready(function() {
    $(".checkboxRol:checked").each(function() {
      console.log($(this).val());
    });
  });
}

listarUsuario(){
  this._usuarioService.getConsultaUsuario(this.page,this.perPage,this.valor,this.estado).subscribe(
    Response=>{
      this.mostrarPag=false;
      this.data=Response["data"].rows;
      console.log(this.data);
      this.totalRows=Response["data"].totalRows;
      if(this.data.length>=this.perPage || this.page!=1){
        this.mostrarPag=true;
      }
    },
    error=>{
      console.log(error.error.message);
    }
  ); 
}

dataRolNOUsuario=[];
listarRolNoUsuario(secuenciaUsuario){
  this._rolesService.getConsultarRolesPorNoUsuario(secuenciaUsuario).subscribe(
    Response=>{
      console.log(Response);
      this.dataRolNOUsuario=Response['data'];
    },
    error=>{
      console.log(error.error.message);
    }
  ); 
}

rolesElimnado=[];
dataEliminado(data){
  console.log(data);
  this.rolesElimnado=data;
}

activarOInactivarUsuario(secuenciaUsuario){
  this._usuarioService.putActivarOInactivarUsuario(secuenciaUsuario).subscribe(
    Response=>{
      this.listarUsuario();
      console.log("Ok");
    },
    error=>{
      console.log(error.error.message);
    }
  ); 
}
}
