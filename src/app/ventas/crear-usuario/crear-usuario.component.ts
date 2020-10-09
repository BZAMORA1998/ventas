import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/service/autenticacion.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers:[AutenticacionService]
})
export class CrearUsuarioComponent implements OnInit {

  constructor(
    private _autenticacionService:AutenticacionService
  ) { }

  ngOnInit(): void {
    this.getTipoIdentificacion();
  }

  public data:any=[
                    {
                      codigoTipoIdentificacion:0,
                      nombreTipoIdentificacion:""
                   }
                ];

  /**
     * @author Bryan Zamora
     * @description Tipo de identificacion
     */
  getTipoIdentificacion(){
    this._autenticacionService.getTipoIdentificacion().subscribe(
        Response=>{
          this.data=Response.data;
        },
        error=>{
          console.log(error.error.message);
        }
    ); 
  }
}
