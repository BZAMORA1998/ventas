import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-listar-ususarios',
  templateUrl: './listar-ususarios.component.html',
  styleUrls: ['./listar-ususarios.component.css'],
  providers:[UsuarioService,GeneralService]
})
export class ListarUsusariosComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _generalService:GeneralService) { }

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
  this.getTipoIdentificacion();
  this.getGenero();
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
public estado:String="";
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
      this.sweetalert2Component.showModalError(error.message);
    }
  ); 
}

deleteUsuario(idUsuario){
  this.sweetalert2Component.loading(true);
  this._usuarioService.deleteUsuario(idUsuario).subscribe(
    Response=>{
      this.listarUsuario();
      this.sweetalert2Component.loading(false);
    },
    error=>{
      this.sweetalert2Component.loading(false);
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

putActualizarUsuario(idUsuario){
  this.sweetalert2Component.loading(true);
  this._usuarioService.putActualizarUsuario(idUsuario,this.dataAct).subscribe(
    Response=>{
      this.listarUsuario();
      this.sweetalert2Component.loading(false);
    },
    error=>{
      this.sweetalert2Component.loading(false);
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

getUsuarioXId(idUsuario){
  this._usuarioService.getUsuarioXId(idUsuario).subscribe(
    Response=>{
      this.limpiar();
      this.dataAct=Response["data"];
    },
    error=>{
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

public tipoIdentificacion:any=[
  {
    secuenciaTipoIdentificacion:0,
    nombre:""
 }
];
public genero:any=[
  {
    secuenciaGenero:0,
    nombre:"",
    descripcionGenero:""
  }
];

/**
* @author Bryan Zamora
* @description Tipo de identificacion
*/
getTipoIdentificacion(){
this._generalService.getTipoIdentificacion().subscribe(
  Response=>{
    this.tipoIdentificacion=Response.data;
    console.log(Response.data);
  },
  error=>{
    console.log(error.error.message);
  }
); 
}

/**
* @author Bryan Zamora
* @description Genero
*/
getGenero(){
this._generalService.getGenero().subscribe(
Response=>{
    this.genero=Response.data;
      this.genero.forEach(element => {
      if(element.nombre=='M'){
      element.descripcionGenero="Masculino";
      }else{
      element.descripcionGenero="Femenino";
      }
  });
    },
    error=>{
      console.log(error.error.message);
    }
  ); 
}


limpiar(){
  this.dataAct={
    numeroIdentificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    usuario:"",
    fechaNacimiento:null,
    secuenciaTipoIdentificacion: 0,
    secuenciaGenero: 0,
    secuenciaUsuarioSistema: 0,
    rolSistema:""
  }
}

}
