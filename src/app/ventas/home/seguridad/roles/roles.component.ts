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
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

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
     * @description Genero
     */
    modulos=[];
    getModulos(){
      this._generalService.getModulos().subscribe(
          Response=>{
            this.modulos=Response.data;
            console.log(Response.data);
          },
          error=>{
            console.log(error.error.message);
          }
      ); 
    }

  validaSiEsVacion(){
    console.log(" Nombre",this.nombre);
    if(this.nombre!=""){
      console.log("Si");
      $("#aceptar").prop('disabled', false);
    }else{
      console.log("No");
      $("#aceptar").prop('disabled', true);
    }
  }

  secuenciaRol=0
  seleccionarTr(i,secuenciaRol){
    this.secuenciaRol=secuenciaRol;
        console.log(i);
    $(document).ready(function(){
      $(`tr`).css("background-color","white")
      .css("color","black");

      $(`#tr-${i}`).css("background-color","#bdbdbd")
                   .css("color","white");
    });
  }

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
  

  data2=[];
  consultarRoles(){
    this._rolesService.getConsultarRoles().subscribe(
      response=>{
        console.log(response);
        this.data2=response['data'];
      },
      error=>{
        console.log(error.error.message);
      }

    );
  }


  /*-------------------------------------------------------------*/
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
    console.log("Data Param: ",this.dataGuardar);
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
        console.log("Entro");
      }else{
        $(`#check-${valor}-${i}`).hide();
        $(`#img-${valor}-${i}`).attr("src","../../../assets/img/mas.svg");
        console.log("Salio");
      }
     });
  }
}
