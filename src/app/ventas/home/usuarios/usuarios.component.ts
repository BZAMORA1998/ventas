import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService]
})
export class UsuariosComponent implements OnInit {

  constructor(private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component) { 
    }

  ngOnInit(): void {
    this.crearUsuario();
  }

  public data:any;

  crearUsuario(){
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
    console.log("=>",idUsuario);
    this._usuarioService.deleteUsuario(idUsuario).subscribe(
      Response=>{
        this.data=Response["data"];
        this.crearUsuario();
      },
      error=>{
        this.sweetalert2Component.showModalError(error.error.message);
      }
    ); 
  }
}
