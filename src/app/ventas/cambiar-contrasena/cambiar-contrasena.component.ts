import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  typeInputF="password";
  showPF:boolean=true;
  contrasena:any="";
  mostrarPassword(){

    if(this.typeInputF=="text"){
      this.showPF=true;
      this.typeInputF="password";
    }else{
      this.showPF=false;
      this.typeInputF="text";
    }
  }

}
