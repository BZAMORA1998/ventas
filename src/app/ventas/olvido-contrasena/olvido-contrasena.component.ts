import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-olvido-contrasena',
  templateUrl: './olvido-contrasena.component.html',
  styleUrls: ['./olvido-contrasena.component.css']
})
export class OlvidoContrasenaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  correo:any="";

  validaSiEsVacion(){
    if(this.correo!=""){
      console.log("Si");
      $("#aceptar").prop('disabled', false);
    }else{
      console.log("No");
      $("#aceptar").prop('disabled', true);
    }
  }
}
