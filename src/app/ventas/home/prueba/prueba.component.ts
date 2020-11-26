import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css'],
  providers:[UsuarioService]
})
export class PruebaComponent implements OnInit {
  
  public mostrarTabla:boolean=false;

  constructor(private _usuarioService:UsuarioService,
              private sweetalert2Component:Sweetalert2Component) { }

  ngOnInit(): void {
    this.listarUsuario()
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

    camposJson: string[] = ['numeroIdentificacion',
    'primerNombre','segundoNombre','primerApellido','segundoApellido',"usuario"
    ,"fechaNacimiento"];

    public totalRows:Number=0;
    public mostrarPag:Boolean=false;
    listarUsuario(){
      this._usuarioService.getConsultaUsuario("","").subscribe(
        Response=>{
          this.mostrarPag=false;
          this.data=Response["data"].rows;
          this.totalRows=Response["data"].totalRows;
          console.log(this.data);
          this.mostrarTabla=true;
        },
        error=>{
          this.sweetalert2Component.showModalError(error.message);
        }
      ); 
    }
}
