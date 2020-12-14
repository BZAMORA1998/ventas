import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-material-design',
  templateUrl: './material-design.component.html',
  styleUrls: ['./material-design.component.css'],
  providers:[UsuarioService]
})
export class MaterialDesignComponent implements OnInit {
  
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
