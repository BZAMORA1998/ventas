import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/service/autenticacion.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Sweetalert2Component } from 'src/app/share/sweetalert2/sweetalert2.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers:[UsuarioService,AutenticacionService,DatePipe]
})
export class UsuariosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

   
}
