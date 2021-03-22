import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { GeneralService } from 'src/app/service/general.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import { Sweetalert2Component } from '../sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-usuarios-ca',
  templateUrl: './usuarios-ca.component.html',
  styleUrls: ['./usuarios-ca.component.css'],
  providers:[GeneralService,UsuarioService,DatePipe]
})
export class UsuariosCAComponent implements OnInit {
  @Output () valueResponse: EventEmitter<any> = new EventEmitter();

  crearOActualizarUsuario(){
    this.valueResponse.emit(this.data);
  }
  constructor(
    private _generalService:GeneralService,
    private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private translate: TranslateService,

  ) {
    this.translate.setDefaultLang(environment.languaje);
   }
   consultarUsuarioDisponible(){
     if(this.data.primerNombre.length>0 && this.data.primerApellido.length>0)
        this.getConsultarUsuarioDisponible();
    
      console.log(this.data);
   }

   consultarEdad(){
    this._generalService.getConsultarEdad(this.data.fechaNacimiento).subscribe(
      Response=>{
        this.data.edad=Response.data.edad;
        console.log(Response.data);
      },
      error=>{
        console.log(error.error.message);
      }
  ); 
      console.log(this.data);
   }

   getConsultarUsuarioDisponible(){
    this._usuarioService.getConsultarUsuarioDisponible(this.data.primerNombre,this.data.segundoNombre,this.data.primerApellido,this.data.segundoApellido).subscribe(
      Response=>{
        this.data.usuario=Response.data.usuarioDisponible;
        console.log(Response.data);
      },
      error=>{
        console.log(error.error.message);
      }
    ); 
   }

   photo:File=null;
  data=
    {
      primerNombre:"",
      primerApellido:"",
      segundoNombre:"",
      segundoApellido:"",
      secuenciaTipoIdentificacion:0,
      secuenciaGenero:0,
      fechaNacimiento:"",
      usuario:"",
      numeroIdentificacion:"",
      secuenciaPais:0,
      secuenciaProvincia:0,
      secuenciaCiudad:0,
      secuenciaRol:2,
      email:"",
      edad:""
  }

  ngOnInit(): void {
    this.getTipoIdentificacion();
    this.getGenero();
    this.getPais();
  }

  secuenciaPais=0;
  secuenciaProvincia=0;

  /*
  * Crooper 
  * Link: https://www.npmjs.com/package/ngx-image-cropper
  */
  imageChangedEvent: any = '';
  croppedImage: any = '../../../../assets/img/user_icon-icons.com_57997.svg';
  selectedFiles: FileList;
  currentFileUpload: File;
  fileChangeEvent(event): void {
      this.imageChangedEvent = event;
      $(document).ready(function(){
        ($('#exampleModalScrollable') as any).modal('show');
      });
      this.selectedFiles=event.target.files; 
      this.currentFileUpload=this.selectedFiles.item(0);
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log("this.croppedImage",this.croppedImage);
  }
  imageLoaded(image: HTMLImageElement) {
     
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  //------------------------------------------------
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
            console.log(Response.data);
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

     /**
     * @author Bryan Zamora
     * @description Genero
     */
     pais=[];
    getPais(){
      this._generalService.getPais().subscribe(
          Response=>{
            this.pais=Response.data;
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
    provincia=[];
    getProvincia(){
      console.log(this.secuenciaPais);
      this._generalService.getProvincia(this.data.secuenciaPais).subscribe(
          Response=>{
            this.provincia=Response.data;
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
    ciudad=[];
    getCiudad(){
      this._generalService.getCiudad(this.data.secuenciaPais,this.data.secuenciaProvincia).subscribe(
          Response=>{
            this.ciudad=Response.data;
            console.log(Response.data);
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }

    postPhoto(photo,idPersona){
      this._usuarioService.postPhoto(photo,idPersona).subscribe(
        Response=>{
          console.log(Response);
        },
        error=>{
          console.log(error);
        }
    ); 
    }

    validarSelect(strId){
      var f = (document.getElementById("select-"+strId) as HTMLInputElement).value;
      var valor=f.split(":",2);
      var valor2=parseInt(valor[0]);
      if(valor2==0){
        document.getElementById("validar-"+strId).style.display = 'block';
      }else{
        document.getElementById("validar-"+strId).style.display = 'none';;
      }
    }
}
