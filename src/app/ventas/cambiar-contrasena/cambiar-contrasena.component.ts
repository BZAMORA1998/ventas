import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  typeInputF1="password";
  showPF1:boolean=true;
  contrasena1:any="";
  mostrarPassword1(){

    if(this.typeInputF1=="text"){
      this.showPF1=true;
      this.typeInputF1="password";
    }else{
      this.showPF1=false;
      this.typeInputF1="text";
    }
  }

  typeInputF2="password";
  showPF2:boolean=true;
  contrasena2:any="";
  mostrarPassword2(){

    if(this.typeInputF2=="text"){
      this.showPF2=true;
      this.typeInputF2="password";
    }else{
      this.showPF2=false;
      this.typeInputF2="text";
    }
  }

  compararContrasena(){
    if(this.contrasena2!="" && this.contrasena1!=""
     && this.contrasena2==this.contrasena1){
      console.log("Si");
      $("#aceptar").prop('disabled', false);
    }else{
      console.log("No");
      $("#aceptar").prop('disabled', true);
    }
  }

}
