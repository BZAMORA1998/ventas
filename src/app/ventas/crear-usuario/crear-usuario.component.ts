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

    typeInputF2="password";
    showPF2:boolean=true;
    mostrarPassword2(){
  
      if(this.typeInputF2=="text"){
        this.showPF2=true;
        this.typeInputF2="password";
      }else{
        this.showPF2=false;
        this.typeInputF2="text";
      }
    }
    typeInputF1="password";
    showPF1:boolean=true;
    mostrarPassword1(){
  
      if(this.typeInputF1=="text"){
        this.showPF1=true;
        this.typeInputF1="password";
      }else{
        this.showPF1=false;
        this.typeInputF1="text";
      }
    }
}
