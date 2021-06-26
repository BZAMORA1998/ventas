import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/service/general.service';
import { RolesService } from 'src/app/service/roles.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
declare var $:any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  providers:[RolesService,GeneralService]
})
export class RolesComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  nombre:String;

  constructor(private _formBuilder: FormBuilder,
    private _rolesService:RolesService,
    private _generalService: GeneralService,
    private sweetalert2Component:Sweetalert2Component,) {}

  ngOnInit() {
    this.consultarRoles();
    this.getModulos();
  }

     /**
   * @author Bryan Zamora
   * @description Guarda el rol por modulo
   */
  secuenciaModul:Number;
  postRol(){
    this.sweetalert2Component.loading(true);
    this._rolesService.postRol(this.nombre,this.secuenciaModul).subscribe(
      response=>{
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalConfirmacion(response.message,null);
        this.consultarRoles();
      },
      error=>{
        console.log(error);
        this.sweetalert2Component.loading(false);
        this.sweetalert2Component.showModalError(error);
      }
    );
  }

    /**
     * @author Bryan Zamora
     * @description Consulta los modulos
     */
    modulos=[];
    getModulos(){
      this._generalService.getModulos().subscribe(
          Response=>{
            this.modulos=Response.data;
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }


   /**
   * @author Bryan Zamora
   * @description valida si el campo nombre esta vacio para habilitar el boton
   */
  validaSiEsVacio(){
    if(this.nombre!=""){
      $("#aceptar").prop('disabled', false);
    }else{
      $("#aceptar").prop('disabled', true);
    }
  }

  secuenciaRol=0
  seleccionarTr(i,secuenciaRol){
    this.secuenciaRol=secuenciaRol;
        console.log(i);
    $(document).ready(function(){
      $('tr').css("background-color","white")
      .css("color","black");

      $(`#tr-${i}`).css("background-color","#bdbdbd")
                   .css("color","white");
    });
   }


   /**
   * @author Bryan Zamora
   * @description guarda las rutas por rol
   */
  postGuardarRutasPorRol(){
    this.sweetalert2Component.loading(true);
    this._rolesService.postGuardarRutasPorRol(this.secuenciaRol,this.dataGuardar).subscribe(
      response=>{
        console.log(response);
        this.sweetalert2Component.loading(false);
        this.consultarUrlPorRol(this.secuenciaRol);
      },
      error=>{
        console.log(error.error.message);
        this.sweetalert2Component.loading(false);
      }

    );
  }
  

  public page:Number=1;
  public perPage:Number=3;
  public totalRows:Number=0;
  public mostrarPag:Boolean=false;
  getpaginacion(page){
    this.page=page;
    this.consultarRoles();
  }

  /**
   * @author Bryan Zamora
   * @description Consultar roles
   */
  data2=null;
  consultarRoles(){
    this._rolesService.getConsultarRoles(this.page,this.perPage).subscribe(
      Response=>{
        this.mostrarPag=false;
        this.data2=Response["data"].rows;
        this.totalRows=Response["data"].totalRows;
        if(this.data2.length>=this.perPage || this.page!=1){
          this.mostrarPag=true;
        }
      },
      error=>{
        console.log(error.error.message);
      }

    );
  }

  data=[];
  aparecerUrl:Boolean=false;
  public consultarUrlPorRol(idRol){
    this._rolesService.getConsultarRutasPorRol(idRol).subscribe(
      response=>{
        console.log("data: ",response['data']);
        this.data=response['data'];
        this.aparecerUrl=true;
      },
      error=>{
        console.log(error);
      }
    );
  }

  dataGuardar=[];
  guardar(){
    this.dataGuardar=[];
    this.data.forEach(e=>{
      if(e.esSelect){
        this.dataGuardar.push(e.secuenciaRuta);
      }
      
      if(e.rutas.length>0){
        e.rutas=this.guardarParm(e.rutas);
      }

    });
    this.postGuardarRutasPorRol();
  }

  check(secuenciaRuta){
    this.data.forEach(e=>{
      if(e.secuenciaRuta==secuenciaRuta){
        if(e.esSelect){
           e.esSelect=false;
        }else{
          e.esSelect=true;
        }
      }
      
      if(e.rutas.length>0){
        e.rutas=this.checkParm(e.rutas,secuenciaRuta);
      }

    });
  }

  checkParm(data,secuenciaRuta){
    data.forEach(e=>{
      if(e.secuenciaRuta==secuenciaRuta){
        if(e.esSelect){
           e.esSelect=false;
        }else{
          e.esSelect=true;
        }
      }
      
      if(e.rutas.length>0){
        e.rutas=this.checkParm(e.rutas,secuenciaRuta);
      }
    });
    return data;
  }

  guardarParm(data){
    data.forEach(e=>{
      if(e.esSelect){
        this.dataGuardar.push(e.secuenciaRuta);
      }
      
      if(e.rutas.length>0){
        e.rutas=this.guardarParm(e.rutas);
      }
    });

    return data;
  }

  public isCheckImg(valor,i){
    $(document).ready(function(){  
      console.log(`#check-${valor}-${i+1}`);
      if($(`#check-${valor}-${i}`).css('display') == 'none'){
        $(`#check-${valor}-${i}`).show();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/signo-menos.svg");
      }else{
        $(`#check-${valor}-${i}`).hide();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/mas.svg");
      }
     });
  }
}
