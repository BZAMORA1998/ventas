import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { RolesService } from 'src/app/service/roles.service';
declare var $:any;

@Component({
  selector: 'app-checkbox-recursive-rol',
  templateUrl: './checkbox-recursive-rol.component.html',
  styleUrls: ['./checkbox-recursive-rol.component.css'],
  providers:[RolesService]
})
export class CheckboxRecursiveRolComponent implements OnInit {

  ngOnInit(): void {
    this.consultarUrlPorRol(3);
  }

  constructor(private _rolesService:RolesService){}

  data=[];
  public consultarUrlPorRol(idRol){
    this._rolesService.getConsultarRutasPorRol(idRol).subscribe(
      response=>{
        console.log("data: ",response['data']);
        this.data=response['data'];
      },
      error=>{
        console.log(error);
      }
    );
  }

  public clickCheckBox(secuencia){
    this.data.forEach(e=>{
      console.log("CodigoRuta: ",e.secuenciaRuta);
      if( e.rutas.length>0){
        e.rutas=this.recorrerLista(e.rutas);
      }
    });
  }

  public recorrerLista(rutas):any{
    rutas.forEach(e=>{
      console.log("CodigoRuta: ",e.secuenciaRuta);
      if( e.rutas.length>0){
         e.rutas=this.recorrerLista(e.rutas);
      }
    });
    return rutas;
  }

  public isCheckImg(valor,i){
    $(document).ready(function(){  
      console.log(`#check-${valor}-${i+1}`);
      if($(`#check-${valor}-${i}`).css('display') == 'none'){
        $(`#check-${valor}-${i}`).show();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/signo-menos.svg");
        console.log("Entro");
      }else{
        $(`#check-${valor}-${i}`).hide();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/mas.svg");
        console.log("Salio");
      }
     });
  }
}

