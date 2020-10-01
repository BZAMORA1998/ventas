import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AutenticacionService]
})
export class LoginComponent implements OnInit {

  public usuario:String;
  public contrasena:String;

  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _autenticacionService:AutenticacionService
  ) { 

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

  loading(activar){
    Swal.fire({
      html: "<div class='row loading'>"+
                "<div class='col-2'>"+
                    "<div class='spinner-border'></div>"+
                '</div>'+
                "<div class='col-10'>"+
                    "<p class='text-dark'>Procesando, espere por favor...</p>"+
                '</div>'+
            "</div>",    
      showCancelButton: false,
      showConfirmButton: false,
      width: '380px',
    });

    if(!activar){
      Swal.close();
    }
  }

  showModalError(message){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor:'#ea792d',
    })
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
    this.loading(true);
    this._autenticacionService.postAutenticacion(this.usuario,this.contrasena).subscribe(
        Response=>{
          console.log(Response.data);
          this.loading(false);
        },
        error=>{
          this.loading(false);
          this.showModalError(error.error.message);
        }
      );
    }
  }
