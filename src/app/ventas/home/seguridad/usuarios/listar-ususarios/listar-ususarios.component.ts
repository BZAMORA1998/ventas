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

  public data=[]

  ngOnInit(): void {
    this.listarUsuario();
  }
  actualizarUsuario(data){
      console.log("Actualizar ",data);
      this.sweetalert2Component.loading(true);
      this._usuarioService.putActualizarUsuario(data).subscribe(
        Response=>{
          this.dataUsuarioId=Response.data;
          console.log(Response.data);
          this.sweetalert2Component.showModalConfirmacion(Response.message,null);
        },
        error=>{
          console.log(error.error.message);
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalError(error.error.message);
        }
      ); 
  }

  dataUsuarioId=[];
  getUsuarioXId(idUsuario){
    this._usuarioService.getUsuarioXId(idUsuario).subscribe(
      Response=>{
        this.dataUsuarioId=Response.data;
        console.log(Response.data);
      },
      error=>{
        console.log(error.error.message);
      }
    ); 
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

guardar(idUsuario){
  var data=[];
  $(".checkboxRol:checked").each(function() {
    data.push($(this).val());
  });
  this.putGuardarRolesPorUsuario(idUsuario,data);
}
putGuardarRolesPorUsuario(idUsuario: any, data: any[]) {
  this.sweetalert2Component.loading(true);
  this._rolesService.postGuardarUsuarioPorRol(idUsuario,data).subscribe(
    Response=>{
      //this.getConsultaRolPorUsuarioTodos(idUsuario);
      this.sweetalert2Component.loading(false);
    },
    error=>{
      console.log(error.error.message);
      this.sweetalert2Component.loading(false);
      this.sweetalert2Component.showModalError(error.error.message);
    }
  ); 
}

getConsultaRolPorUsuarioTodos(idUsuario){
  this._rolesService.getConsultarRolesPorUsuarioTodo(idUsuario).subscribe(
    Response=>{
      this.data.forEach(e=>{
          if(e.secuenciaUsuario==idUsuario){
            console.log(this.data);
            e.roles=Response['data'];
          }
      });
    },
    error=>{
      console.log(error.error.message);
    }
  );
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
