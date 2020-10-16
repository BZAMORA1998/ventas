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
    this.getGenero();
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
          console.log("data =>",this.tipoIdentificacion);
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

            console.log("data =>",this.genero);
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }
}
