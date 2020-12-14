import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
  providers:[AutenticacionService,UsuarioService,DatePipe]
})
export class CrearUsuarioComponent implements OnInit {

  
  public activeLang =JSON.parse(localStorage.getItem("languaje"));

  constructor(
    private _autenticacionService:AutenticacionService,
    private _usuarioService:UsuarioService,
    private sweetalert2Component:Sweetalert2Component,
    private _datePipe: DatePipe,
    private translate: TranslateService,

  ) {
    this.translate.setDefaultLang(this.activeLang);
   }

  data={
    primerNombre:"",
    segundoNombre:"",
    primerApellido:"",
    segundoApellido:"",
    codigoTipoIdentificacion:0,
    codigoGenero:0,
    fechaNacimiento:"",
    user:"",
    password1:"",
    password:"",
    passwordCon:"",
    numeroIdentificacion:"",
    photo:""
}

  ngOnInit(): void {
    this.getTipoIdentificacion();
    this.getGenero();
  }

  /*
  * Crooper 
  * Link: https://www.npmjs.com/package/ngx-image-cropper
  */
  imageChangedEvent: any = '';
  croppedImage: any = '../../../assets/img/user_icon-icons.com_57997.svg';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      $(document).ready(function(){
        ($('#exampleModalScrollable') as any).modal('show');
      });
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      this.data.photo=this.croppedImage;
      console.log(" this.data.photo=this.croppedImage;", this.data.photo);
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

    crearUsuario(){
      this.sweetalert2Component.loading(true);
      this._usuarioService.postCrearUsuario(this.data).subscribe(
        Response=>{
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalConfirmacion(Response.message);
        },
        error=>{
          this.sweetalert2Component.loading(false);
          this.sweetalert2Component.showModalError(error.error.message);
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

    validarContrasenia(){
      if(this.data.passwordCon==this.data.password1){
        return true
      }else{
          return false
      }
    }
}
