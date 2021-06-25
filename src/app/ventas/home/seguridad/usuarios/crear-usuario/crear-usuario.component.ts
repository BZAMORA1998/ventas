import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from 'src/app/service/general.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
import { environment } from 'src/environments/environment';
declare var $:any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers:[GeneralService,UsuarioService,DatePipe]
})
export class CrearUsuarioComponent implements OnInit {

  
  public activeLang =JSON.parse(localStorage.getItem("languaje"));

  constructor(
    private _generalService:GeneralService,
    private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _datePipe: DatePipe,
    private translate: TranslateService,

  ) {
    this.translate.setDefaultLang(environment.languaje);
   }
   photo:File=null;
  
  ngOnInit(): void {
    this.sweetalert2Component.showModalConfirmacion("OK","../ventas/home/seguridad/usuarios/listar-usuarios");
  }
  
  crearUsuario(data){
      this.sweetalert2Component.loading(true);
      this._usuarioService.postCrearUsuario(data).subscribe(
        Response=>{
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalConfirmacion(Response.message,"../ventas/home/seguridad/usuarios/listar-usuarios");
        },
        error=>{
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalError(error.error.message);
        }
    ); 
  }
}
