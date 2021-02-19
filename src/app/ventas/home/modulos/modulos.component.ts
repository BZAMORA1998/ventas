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
  }
}
