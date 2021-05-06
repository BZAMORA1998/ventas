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

  constructor(private _rolesService:RolesService){
  }

  data=[];
  public consultarUrlPorRol(idRol){
    this._rolesService.getConsultarRutasPorRol(idRol).subscribe(
      response=>{
        console.log("data: ",response['data']);
        this.data=response['data'];
        this.clickCheckBox();
      },
      error=>{
        console.log(error);
      }
    );
  }

  evento(id){
    console.log(id);
    var check=false;
    var a;
    var i=this.i

    this.listI.forEach(element => {
      a=element;
    });

    this.listI.forEach(element => {

      console.log("Hoooola",a);
        $(document).ready(function(){  
          if(id<element || id==a){ 
              if($(`#d-${id}`).prop("checked") == true){
                check=true
              }else{
                check=false
              }
              
              if(id==a){
                do{
                  console.log("dddd",i);
                  console.log(`#d-${id}`)
                  $(`#d-${id}`).prop( "checked", check );
                  id=id+1;
                
                 }while(id<=i);
              }else{
                do{
    
                  console.log(`#d-${id}`)
                  $(`#d-${id}`).prop( "checked", check );
                  id=id+1;
                
                 }while(id<element);
              }
            } 
        });
    });
  }

  i:number=0;
  listI=[];
  listPadre=[];
  public clickCheckBox(){

    this.data.forEach(e=>{
      this.i=this.i+1;
      this.listI.push(this.i);
      console.log("CodigoRuta: ",e.secuenciaRuta);
      e.id=this.i;
      if( e.rutas.length>0){
        this.listPadre.push(this.i);
        e.rutas=this.recorrerLista(e.rutas);
      }
    });
    console.log("Dat: ",this.data);
    console.log("Number: ",this.listI);
  }

  public recorrerLista(rutas):any{
    rutas.forEach(e=>{
      console.log("CodigoRuta: ",e.secuenciaRuta);
      this.i=this.i+1;
      e.id=this.i;
      if( e.rutas.length>0){
        this.listPadre.push(this.i);
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

