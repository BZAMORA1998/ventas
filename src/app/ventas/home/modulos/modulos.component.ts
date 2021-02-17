import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-modulos-design',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.css'],
  providers:[UsuarioService]
})
export class ModulosComponent implements OnInit {
  
  public mostrarTabla:boolean=false;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _usuarioService:UsuarioService,
              private sweetalert2Component:Sweetalert2Component,
              private _formBuilder: FormBuilder) { }
  
  control = new FormControl();
  streets:any=[];
  filteredStreets: Observable<string[]>;
  
  ngOnInit(): void {
    $(document).ready(function(){
      $('.card').hover(
        function () {
          $(this).css({"border": "1px solid blue","color":"blue"});
         $(".card-body .card-title").addClass("card-title-hover");
       }, 

       function () {
        $(this).css({"border":"1px solid #dfdfdf","color":"#dfdfdf"});
        $(".card-body .card-title").removeClass("card-title-hover");
       }
      );
    });


    this.data=null;
    this.listarUsuario()
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    /*
    * Buscador
    */
    this.filteredStreets = this.control.valueChanges.pipe(
               startWith(''),
      map(value => this._filter(value))
    );
  }

  /*
  * Buscador
  */
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street.primerApellido).includes(filterValue));
  }

    /*
  * Buscador
  */
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public data:any=[
    {
        numeroIdentificacion: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        usuario: "",
        fechaNacimiento: null,
        codigoTipoIdentificacion: null,
        codigoGenero: null,
        secuenciaUsuarioSistema: 0,
        esActivo:"S"
    }];

    camposJson: string[] = ['numeroIdentificacion',
    'primerNombre','segundoNombre','primerApellido','segundoApellido',"usuario"
    ,"fechaNacimiento"];

    public totalRows:Number=0;
    public mostrarPag:Boolean=false;
    private g:string;
    listarUsuario(){
      this._usuarioService.getConsultaUsuario("","").subscribe(
        Response=>{
          this.mostrarPag=false;
          this.data=Response["data"].rows;
          this.totalRows=Response["data"].totalRows;

          this.streets=this.data;

          console.log(this.streets);
          this.mostrarTabla=true;
        },
        error=>{
          this.sweetalert2Component.showModalError(error.message);
        }
      ); 
    }
}
