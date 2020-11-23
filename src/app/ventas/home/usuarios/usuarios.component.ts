import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService,AutenticacionService,DatePipe]
})
export class UsuariosComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _autenticacionService:AutenticacionService,
    private _datePipe: DatePipe) { 
      
    }

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
      codigoTipoIdentificacion: 0,
      codigoGenero: 0,
      fechaNacimiento:null,
      usuario:"",
      secuenciaUsuarioSistema:0,
      rolSistema:""
    }

  ngOnInit(): void {
    this.listarUsuario();
    this.getTipoIdentificacion();
    this.getGenero();
  }


  listarUsuario(){
    this._usuarioService.getConsultaUsuario().subscribe(
      Response=>{
        this.data=Response["data"];
      },
      error=>{
        this.sweetalert2Component.showModalError(error.error.message);
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
      codigoTipoIdentificacion:0,
      nombreTipoIdentificacion:""
   }
];
public genero:any=[
    {
      codigoGenero:0,
      nombreGenero:"",
      descripcionGenero:""
    }
];

/**
* @author Bryan Zamora
* @description Tipo de identificacion
*/
getTipoIdentificacion(){
  this._autenticacionService.getTipoIdentificacion().subscribe(
    Response=>{
      this.tipoIdentificacion=Response.data;
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
  this._autenticacionService.getGenero().subscribe(
  Response=>{
      this.genero=Response.data;
        this.genero.forEach(element => {
        if(element.nombreGenero=='M'){
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
      codigoTipoIdentificacion: 0,
      codigoGenero: 0,
      secuenciaUsuarioSistema: 0,
      rolSistema:""
    }
  }
}
