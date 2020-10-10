import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import {Sweetalert2Component} from '../../share/sweetalert2/sweetalert2.component'
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AutenticacionService]
})
export class LoginComponent implements OnInit {

  public usuario:String;
  public contrasena:String;
  public activeLang =environment.languaje;
  
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _autenticacionService:AutenticacionService,
    private sweetalert2Component:Sweetalert2Component,
    private translate: TranslateService
  ) { 
      this.translate.setDefaultLang(this.activeLang);
    }
  
    public cambiarLenguaje(lang) {
      this.activeLang = lang;
      this.translate.use(lang);
    }
    
    typeInputF="password";
    showPF:boolean=true;
    mostrarPassword(){
  
      if(this.typeInputF=="text"){
        this.showPF=true;
        this.typeInputF="password";
      }else{
        this.showPF=false;
        this.typeInputF="text";
      }
    }

 
  public data:any;

  ngOnInit(): void {
  
  }

  /**
   * @author Bryan Zamora
   * @param user 
   * @param password 
   * @description Autenticacion de usuario
   */
  postAutenticacion(){
    this.sweetalert2Component.loading(true);
    this._autenticacionService.postAutenticacion(this.usuario,this.contrasena).subscribe(
        Response=>{
          console.log(Response.data);
          localStorage.setItem("token",JSON.stringify(Response.data.token));
          this.sweetalert2Component.loading(false);
        },
        error=>{
          this.sweetalert2Component.showModalError(error.error.message);
        }
      );
    }
  }
